package com.example.shoppingMall.Global.security;

import com.example.shoppingMall.Auth.model.User;
import com.example.shoppingMall.Auth.service.AuthService;
import com.example.shoppingMall.Global.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AuthService authService;

    public JwtAuthorizationFilter(
        AuthenticationManager authenticationManager,
        JwtUtil jwtUtil,
        AuthService authService
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
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
        System.out.println(isTokenValid);

        // 토큰으로 유저 아이디, 유저 권한 조회
        String user_id = jwtUtil.getUserIdFromToken(token);
        User user = authService.findByUserId(user_id);
        String principal = user.getUser_id();
        String credentials = user.getUser_role();
        System.out.println("JwtAuthorizationFilter is executing. Token valid: " + isTokenValid);
        // SecurityContextHolder에 토큰 저장해야함

        if(isTokenValid == true) {
            CustomAuthenticationToken customAuthenticationToken = new CustomAuthenticationToken(
                principal, credentials
            );
            SecurityContextHolder.getContext().setAuthentication(customAuthenticationToken);
        }
        // 토큰 유형성 검사 속성에 저장
        request.setAttribute("isTokenValid", isTokenValid);

        // 성공하면 authenticationFilter로 이동
        filterChain.doFilter(request, response);
    }
}
