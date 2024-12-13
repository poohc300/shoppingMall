package com.example.shoppingMall.Auth.service;

import com.example.shoppingMall.Global.utils.JwtUtil;
import com.example.shoppingMall.Auth.mapper.AuthMapper;
import com.example.shoppingMall.Auth.model.User;
import com.example.shoppingMall.Global.exception.CustomException;
import com.example.shoppingMall.Global.exception.ErrorCode;
import java.util.HashMap;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final StringEncryptor stringEncryptor;
    private final AuthMapper authMapper;
    private final JwtUtil jwtUtil;

    public AuthService(StringEncryptor stringEncryptor, AuthMapper authMapper, JwtUtil jwtUtil) {
        this.stringEncryptor = stringEncryptor;
        this.authMapper = authMapper;
        this.jwtUtil = jwtUtil;
    }


    @Transactional
    public String registerUser (HashMap<String, Object> data) {
        String username = data.get("username").toString();
        String rawPassword = data.get("user_password").toString();
        String encodedPassword = stringEncryptor.encrypt(rawPassword);
        data.put("user_password", encodedPassword);
        int result = authMapper.signup(data);

        if(result == 0) {
            throw new CustomException(ErrorCode.REGISTRATION_FAILED);
        }
        String token = jwtUtil.generateToken(username, "USER");
        // 생성된 토큰 레디스에 삽입

        return token;
    }

    public User authenticateUser(HashMap<String, Object> data) {
        User user = authMapper.findByUsername(data.get("username").toString());

        if(user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        String encodedPassword = user.getUser_password();
        boolean result = stringEncryptor.decrypt(encodedPassword).equals(user.getUser_password());

        if(result == false) {
            throw new CustomException(ErrorCode.INVALID_USERNAME_OR_PASSWORD);
        }
        return user;
    }

}
