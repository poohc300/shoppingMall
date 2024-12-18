package com.example.shoppingMall.Global.utils;

import com.example.shoppingMall.Global.service.EncryptionService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import javax.crypto.SecretKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    private final EncryptionService encryptionService;
    private final String encryptedSecret;
    private final Long expiration;
    private Key key;

    public JwtUtil(
        EncryptionService encryptionService,
        @Value("${jwt.secret}") String encryptedSecret,
        @Value("${jwt.expiration}") Long expiration
        ) {
        this.encryptionService = encryptionService;
        this.encryptedSecret = encryptedSecret;
        this.expiration = expiration;
    }

    @PostConstruct
    public void init() {
        String secret = encryptedSecret;
        secret = encryptionService.encrypt(secret);
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }


    public String generateToken(String user_id, String roles) {

        return Jwts.builder()
            .subject(user_id)
            .claim("roles", roles)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(key)
            .compact();
    }

    public String refreshToken(String user_id) {
        return Jwts.builder()
            .subject(user_id)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(key)
            .compact();
    }

    public boolean validateToken(String token) {
       try {
           Claims claims = getClaimFromToken(token);
           return !isTokenExpired(claims);
       } catch (Exception e) {
           return false;
       }
    }

    public boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

    public Claims getClaimFromToken(String token) {
        return Jwts.parser()
                  .verifyWith((SecretKey) key)
                  .build()
                  .parseSignedClaims(token)
                  .getPayload();
    }
}
