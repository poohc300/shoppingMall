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
    public HashMap<String, Object> registerUser (HashMap<String, Object> data) {
        System.out.println(data);
        String user_id = data.get("user_id").toString();
        String rawPassword = data.get("user_password").toString();
        String encodedPassword = stringEncryptor.encrypt(rawPassword);
        data.put("user_password", encodedPassword);
        int result = authMapper.signup(data);

        if(result == 0) {
            throw new CustomException(ErrorCode.REGISTRATION_FAILED);
        }
        String access_token = jwtUtil.generateAccessToken(user_id, "USER");
        String refresh_token = jwtUtil.generateRefreshToken(user_id);
        // 생성된 토큰 레디스에 삽입
        redisService.saveUserSession(user_id, access_token, refresh_token);
        // 레디스에서 다시 조회
        HashMap<String, Object> userToken = redisService.getUserSession(user_id);
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

    public HashMap<String, Object> authenticateToken(User user) {
        System.out.println(user);
        HashMap<String, Object> result = new HashMap<>();
        // get token from redis
        result = redisService.getUserSession(user.getUser_id());
        System.out.println(result);

        // if result is null
        if(result == null) {
            // generate new tokens
            String accessToken = jwtUtil.generateAccessToken(user.getUser_id(), user.getUser_role());
            String refreshToken = jwtUtil.generateRefreshToken(user.getUser_id());
            // save tokens in redis
            redisService.saveUserSession(user.getUser_id(), accessToken, refreshToken);
            result.put("accessToken", accessToken);
            result.put("refreshToken", refreshToken);
        }
        String tempToken = result.get("accessToken").toString();
        // validate token from redis
        boolean isValid = false;
        isValid = jwtUtil.validateToken(tempToken);

        if(!isValid) {
            // generate new tokens
            String accessToken = jwtUtil.generateAccessToken(user.getUser_id(), user.getUser_role());
            String refreshToken = jwtUtil.generateRefreshToken(user.getUser_id());
            // save tokens in redis
            redisService.saveUserSession(user.getUser_id(), accessToken, refreshToken);
            result.put("accessToken", accessToken);
            result.put("refreshToken", refreshToken);
        }

        return result;
    }

    public boolean logout(HashMap<String, Object> data) {
        String user_id = data.get("user_id").toString();
        // delete all user's tokens in redis
        boolean result = redisService.deleteUserSession(user_id);
        return result;
    }


}
