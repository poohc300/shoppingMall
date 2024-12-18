package com.example.shoppingMall.Global.interceptor;

import com.example.shoppingMall.Global.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;

    @Value("${JWT_SECRET}")
    private String jwt_secret;

    public JwtInterceptor(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public boolean preHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler) throws Exception {

        String header = request.getHeader("Authorization");

        if(header == null && !header.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing Token");
            return false;
        }
        String accessToken = header.substring(7);

        if (jwtUtil.validateToken(accessToken)) {

           Claims claims = jwtUtil.getClaimFromToken(accessToken);
           request.setAttribute("claims", claims);
           return true;
        } else {

           response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "invalid or expired JWT token");
           return false;
        }

    }
}
