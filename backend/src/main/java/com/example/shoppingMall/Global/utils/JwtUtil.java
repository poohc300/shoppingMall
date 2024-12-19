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
    private final Long access_token_expiration;
    private final Long refresh_token_expiration;
    private Key key;

    public JwtUtil(
        EncryptionService encryptionService,
        @Value("${jwt.secret}") String encryptedSecret,
        @Value("${jwt.access_token_expiration}") Long access_token_expiration,
        @Value("${jwt.refresh_token_expiration}") Long refresh_token_expiration
        ) {
        this.encryptionService = encryptionService;
        this.encryptedSecret = encryptedSecret;
        this.access_token_expiration = access_token_expiration;
        this.refresh_token_expiration = refresh_token_expiration;
    }

    @PostConstruct
    public void init() {
        String secret = encryptedSecret;
        secret = encryptionService.encrypt(secret);
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }


    public String generateAccessToken(String user_id, String roles) {
        long currentMillis = System.currentTimeMillis();
        Date issuedAt = new Date();
        Date expirationDate = new Date(currentMillis + access_token_expiration);

        System.out.println("Current Time: " + currentMillis);
        System.out.println("Issued At: " + issuedAt.getTime());
        System.out.println("Expiration Time: " + expirationDate.getTime());

        return Jwts.builder()
            .subject(user_id)
            .claim("roles", roles)
            .issuedAt(issuedAt)
            .expiration(expirationDate)
            .signWith(key)
            .compact();
    }

    public String generateRefreshToken(String user_id) {
        long currentMillis = System.currentTimeMillis();
         Date issuedAt = new Date();
         Date expirationDate = new Date(currentMillis + refresh_token_expiration);

        System.out.println("Current Time: " + currentMillis);
        System.out.println("Issued At: " + issuedAt.getTime());
        System.out.println("Expiration Time: " + expirationDate.getTime());

        return Jwts.builder()
            .subject(user_id)
            .issuedAt(issuedAt)
            .expiration(expirationDate)
            .signWith(key)
            .compact();
    }

    public boolean validateToken(String token) {
       try {
           Claims claims = getClaimFromToken(token);
           System.out.println(claims);
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
