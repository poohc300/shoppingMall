package com.example.shoppingMall.Global.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {

    public CustomAuthenticationToken(Object principal, Object credentials) {
        super(principal, credentials);
    }


}

