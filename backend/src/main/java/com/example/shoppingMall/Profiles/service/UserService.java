package com.example.shoppingMall.Profiles.service;

import com.example.shoppingMall.Profiles.mapper.UserMapper;
import com.example.shoppingMall.Profiles.model.User;
import com.example.shoppingMall.Global.exception.CustomException;
import com.example.shoppingMall.Global.exception.ErrorCode;
import java.util.HashMap;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final StringEncryptor stringEncryptor;
    private final UserMapper userMapper;

    public UserService(StringEncryptor stringEncryptor, UserMapper userMapper) {
        this.stringEncryptor = stringEncryptor;
        this.userMapper = userMapper;
    }


    @Transactional
    public int registerUser (HashMap<String, Object> data) {
        String rawPassword = data.get("user_password").toString();
        String encodedPassword = stringEncryptor.encrypt(rawPassword);
        data.put("user_password", encodedPassword);
        return userMapper.signup(data);
    }

    public User authenticateUser(HashMap<String, Object> data) {
        User user = userMapper.findByUsername(data.get("username").toString());

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
