package com.example.shoppingMall.Global.security;

import com.example.shoppingMall.Auth.model.User;
import com.example.shoppingMall.Auth.service.AuthService;
import com.example.shoppingMall.Global.utils.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.Collections;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
        System.out.println("JwtAuthorizationFilter is executing"); // 로그 추가

        String requestPath = request.getRequestURI();
        if ("/auth/login".equals(requestPath) || "/auth/signup".equals(requestPath) || "/auth/csrf-token".equals(requestPath)) {
            filterChain.doFilter(request, response);
            return;
        }


        String header = request.getHeader("Authorization");


        if(header == null || !header.startsWith("Bearer ")) {
            //filterChain.doFilter(request, response);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT token is missing");
            return;
        }

        String token = header.substring(7);
        boolean isTokenValid = false;

        try {
            isTokenValid = jwtUtil.validateToken(token);
            System.out.println("Token valid: " + isTokenValid); // 로그 추가
        } catch (JwtException e) {
            System.out.println("Invalid JWT token signature");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token signature");
            return;
        }

        if(isTokenValid) {

            // 토큰으로 유저 아이디, 유저 권한 조회
            String user_id = jwtUtil.getUserIdFromToken(token);
            User user = authService.findByUserId(user_id);
            System.out.println(user);

            if(user == null) {
              response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not found");
              return;
            }

            String principal = user.getUser_id(); // 아이디 principal
            // credentials는 패스워드인데 인증이 된 상태니 null로 처리해야한다고 함

            SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getUser_role());

            CustomAuthenticationToken customAuthenticationToken = new CustomAuthenticationToken(
                principal, null, Collections.singletonList(authority)
            );
            System.out.println(customAuthenticationToken);
            SecurityContextHolder.getContext().setAuthentication(customAuthenticationToken);

        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
            return;
        }
        // 토큰 유형성 검사 속성에 저장
        request.setAttribute("isTokenValid", isTokenValid);

        // 성공하면 authenticationFilter로 이동
        filterChain.doFilter(request, response);
    }
}
