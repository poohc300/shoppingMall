package com.example.shoppingMall.Auth.service;

import com.example.shoppingMall.Global.service.RedisService;
import com.example.shoppingMall.Global.utils.JwtUtil;
import com.example.shoppingMall.Auth.mapper.AuthMapper;
import com.example.shoppingMall.Auth.model.User;
import com.example.shoppingMall.Global.exception.CustomException;
import com.example.shoppingMall.Global.exception.ErrorCode;
import java.util.HashMap;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final StringEncryptor stringEncryptor;
    private final AuthMapper authMapper;
    private final JwtUtil jwtUtil;
    private final RedisService redisService;

    public AuthService(StringEncryptor stringEncryptor, AuthMapper authMapper, JwtUtil jwtUtil, RedisService redisService) {
        this.stringEncryptor = stringEncryptor;
        this.authMapper = authMapper;
        this.jwtUtil = jwtUtil;
        this.redisService = redisService;
    }


    @Transactional
    public String registerUser (HashMap<String, Object> data) {
        System.out.println(data);
        String user_id = data.get("user_id").toString();
        String rawPassword = data.get("user_password").toString();
        String encodedPassword = stringEncryptor.encrypt(rawPassword);
        data.put("user_password", encodedPassword);
        int result = authMapper.signup(data);

        if(result == 0) {
            throw new CustomException(ErrorCode.REGISTRATION_FAILED);
        }
        String token = jwtUtil.generateToken(user_id, "USER");
        // 생성된 토큰 레디스에 삽입
        redisService.saveUserSession(user_id, token);
        // 레디스에서 다시 조회
        String userToken = redisService.getUserSession(user_id);
        return userToken;
    }

    public User authenticateUser(HashMap<String, Object> data) {
        User user = authMapper.findByUserId(data.get("user_id").toString());

        if(user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        String encodedPassword = user.getUser_password();
        boolean result = stringEncryptor.decrypt(encodedPassword).equals(data.get("user_password").toString());

        if(result == false) {
            throw new CustomException(ErrorCode.INVALID_USERNAME_OR_PASSWORD);
        }
        return user;
    }

    public User findByUserId(String user_id) {
        User user =  authMapper.findByUserId(user_id);

        if(user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return user;
    }

}
