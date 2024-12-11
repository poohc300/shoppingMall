package com.example.shoppingMall.Global.auth;

import com.example.shoppingMall.Global.utils.JwtUtil;
import com.example.shoppingMall.Profiles.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public JwtAuthorizationFilter(
        AuthenticationManager authenticationManager,
        JwtUtil jwtUtil
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if(header == null || !header.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }
        String token = header.substring(7);

        if(jwtUtil.validateToken(token)) {
            String username = jwtUtil.getUserNameFromToken(token);
            //CustomAuthenticationToken authenticationToken = new CustomAuthenticationToken(username, );
        }
        filterChain.doFilter(request, response);
    }
}
