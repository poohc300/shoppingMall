package com.example.shoppingMall.Global.security;

import java.util.Collection;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {

    public CustomAuthenticationToken(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public CustomAuthenticationToken(
        Object principal,
        Object credentials,
        Collection<? extends GrantedAuthority> authorities
        ) {
        super(principal, credentials, authorities);
    }

}

