package com.example.shoppingMall.Global.auth;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {
    private String user_role;

    public CustomAuthenticationToken(Object principal, Object credentials, String user_role) {
        super(principal, credentials);
        this.user_role = user_role;
    }

    public String getUser_role() {
        return user_role;
    }

    public void setUser_role(String user_role) {
        this.user_role = user_role;
    }
}

