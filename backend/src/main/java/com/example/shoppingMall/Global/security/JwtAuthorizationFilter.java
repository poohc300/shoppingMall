package com.example.shoppingMall.Global.security;

import com.example.shoppingMall.Global.utils.JwtUtil;
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
        boolean isTokenValid = false;
        if(header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = header.substring(7);
        isTokenValid = jwtUtil.validateToken(token); // 여기서 토큰 예외처리해야함

        // SecurityContextHolder에 토큰 저장해야함

        // 토큰 유형성 검사 속성에 저장
        request.setAttribute("isTokenValid", isTokenValid);

        // 성공하면 authenticationFilter로 이동
        filterChain.doFilter(request, response);
    }
}
