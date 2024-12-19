package com.example.shoppingMall.Auth.controller;
import com.example.shoppingMall.Global.exception.CustomException;
import com.example.shoppingMall.Global.exception.ErrorCode;
import com.example.shoppingMall.Global.utils.JwtUtil;
import com.example.shoppingMall.Auth.model.User;
import com.example.shoppingMall.Auth.service.AuthService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity signup (@RequestBody HashMap<String, Object> data) {
        HashMap<String, Object> result = authService.registerUser(data);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity login (@RequestBody HashMap<String, Object> data) {
        HashMap<String, Object> result = new HashMap<>();

        User user = authService.authenticateUser(data);

        if(user == null) {
          ResponseEntity.status(401).body(ErrorCode.INVALID_USERNAME_OR_PASSWORD);
        }
        result = authService.authenticateToken(user);

        return ResponseEntity.ok().body(result);
    }
    @PostMapping("/validate-token")
    public ResponseEntity validateToken(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        System.out.println(jwtToken);

        try {
            boolean isValid = jwtUtil.validateToken(jwtToken);
            System.out.println(isValid);
            if(isValid) {
              return ResponseEntity.ok().build();
            } else {
              return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired");
            }
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    @PostMapping("/refresh-token")
    public ResponseEntity refreshToken(@RequestBody String token) {

        try {
            String refreshToken = jwtUtil.generateRefreshToken(token);
            System.out.println(refreshToken);
            return ResponseEntity.ok().body(refreshToken);
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
