package com.example.shoppingMall.Global.auth;

import com.example.shoppingMall.Global.exception.CustomException;
import com.example.shoppingMall.Global.exception.ErrorCode;
import com.example.shoppingMall.Global.utils.JwtUtil;
import com.example.shoppingMall.Profiles.model.User;
import com.example.shoppingMall.Profiles.service.UserService;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserService userService;

    public CustomAuthenticationProvider(UserService userService) {
        this.userService = userService;
    }

    @Override
    public Authentication authenticate(Authentication authToken) throws AuthenticationException {
        // principal : 사용자이름
        // credentials: 비밀번호
        HashMap<String, Object> data = new HashMap<>();
        data.put("username", authToken.getPrincipal());
        data.put("user_password", authToken.getCredentials());

        User result = userService.authenticateUser(data);
        if(result == null) {
            throw new CustomException(ErrorCode.INVALID_USERNAME_OR_PASSWORD);
        }
//
        // 사용자 권한
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(result.getUser_role()));

        Authentication authResult = new UsernamePasswordAuthenticationToken(
            result.getUsername(),
            null,
            authorities
        );

        return authResult;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }

}
