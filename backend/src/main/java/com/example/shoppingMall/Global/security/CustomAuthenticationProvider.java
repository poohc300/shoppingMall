package com.example.shoppingMall.Global.security;

import com.example.shoppingMall.Global.exception.CustomException;
import com.example.shoppingMall.Global.exception.ErrorCode;
import com.example.shoppingMall.Profiles.model.User;
import com.example.shoppingMall.Profiles.service.AuthService;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final AuthService authService;

    public CustomAuthenticationProvider(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public Authentication authenticate(Authentication authToken) throws AuthenticationException {
        // principal : 사용자이름
        // credentials: 비밀번호
        HashMap<String, Object> data = new HashMap<>();
        data.put("username", authToken.getPrincipal());
        data.put("user_password", authToken.getCredentials());

        User result = authService.authenticateUser(data);
        if(result == null) {
            throw new CustomException(ErrorCode.INVALID_USERNAME_OR_PASSWORD);
        }
//
        // 사용자 권한
        // User에서 user_role로 관리하나 스프링 시큐리티 자체에서는
        // 밑에 같이 관리해서 불편함. 근데 권한을 넣어서 토큰을 만들어야하니 만듬
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
