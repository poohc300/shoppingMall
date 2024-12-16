package com.example.shoppingMall.Global.config;

import com.example.shoppingMall.Global.security.CustomAuthenticationFilter;
import com.example.shoppingMall.Global.security.CustomAuthenticationProvider;
import com.example.shoppingMall.Global.security.JwtAuthorizationFilter;
import com.example.shoppingMall.Global.utils.JwtUtil;
import com.example.shoppingMall.Auth.service.AuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final JwtUtil jwtUtil;
    private final AuthService authService;

    public SecurityConfig(
        CustomAuthenticationProvider customAuthenticationProvider,
        JwtUtil jwtUtil,
        AuthService authService
    ) {
        this.customAuthenticationProvider = customAuthenticationProvider;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        AuthenticationManager authManager = authenticationManager(http, customAuthenticationProvider);

        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(
            authenticationManager(
                http, customAuthenticationProvider
            ),
            jwtUtil
        );
        customAuthenticationFilter.setFilterProcessesUrl("/login");
        CookieCsrfTokenRepository csrfTokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();


        http
            .csrf(csrf -> csrf.disable())
            .httpBasic(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable)
            .sessionManagement(sessionManagement -> sessionManagement
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(authorize ->
                authorize
                    .requestMatchers( "/auth/login", "/auth/signup", "/auth/csrf-token").permitAll()
                    .anyRequest().authenticated())
            .addFilterBefore(
                new JwtAuthorizationFilter(authManager, jwtUtil, authService),
                customAuthenticationFilter.getClass()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:3000");
        corsConfig.setAllowCredentials(true);
        corsConfig.addAllowedHeader("*");
        corsConfig.addAllowedMethod("*");
        corsConfig.addExposedHeader("Set-Cookie");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, CustomAuthenticationProvider customAuthenticationProvider) throws Exception {
        AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);

        builder.authenticationProvider(customAuthenticationProvider);
        return builder.build();
    }

}

