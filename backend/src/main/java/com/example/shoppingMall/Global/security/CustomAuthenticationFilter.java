package com.example.shoppingMall.Global.security;

import com.example.shoppingMall.Global.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtUtil jwtUtil;


    public CustomAuthenticationFilter(AuthenticationManager authenticationManager ,JwtUtil jwtUtil) {
        setAuthenticationManager(authenticationManager);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // http 요청정보추출
        String username = request.getParameter("username");
        String user_password = request.getParameter("user_password");

        /*
        * SecurityContext에서 인증 정보를 관리하는데
        * 이를 위해선 Authentication 인터페이스를 반드시 사용해줘야함
        * 근데 그냥 쓰면 기존 시스템 User와 안맞아서 커스텀화함
        * principal : 사용자이름
        * credentials: 비밀번호
        * authorities: 권한 (인터페이스가 있어서 구현 까다로움)
        * details: ip주소나 세션 id
        * authenticated: 인증 상태, 기본은 false 인증후 true
        */

        CustomAuthenticationToken authToken = new CustomAuthenticationToken(username, user_password);
        return getAuthenticationManager().authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        SecurityContextHolder.getContext().setAuthentication(authResult);

        chain.doFilter(request, response);
    }

}
