package com.example.shoppingMall.Global.utils;

import com.example.shoppingMall.Global.service.EncryptionService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import org.jasypt.encryption.StringEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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


    public String generateToken(String username, String roles) {


        return Jwts.builder()
            .subject(username)
            .claim("roles", roles)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(key)
            .compact();
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    public Boolean isTokenExpired(String token) {
        return getExpirationDateFromToken(token).before(new Date());
    }

    public String getUserNameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
            .verifyWith((SecretKey) key)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }


}
