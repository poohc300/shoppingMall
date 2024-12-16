package com.example.shoppingMall.Auth.controller;
import com.example.shoppingMall.Global.exception.CustomException;
import com.example.shoppingMall.Global.exception.ErrorCode;
import com.example.shoppingMall.Global.utils.JwtUtil;
import com.example.shoppingMall.Auth.model.User;
import com.example.shoppingMall.Auth.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        String result = authService.registerUser(data);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity login (@RequestBody HashMap<String, Object> data) {
        User user = authService.authenticateUser(data);
        HashMap<String, Object> result = new HashMap<>();

        if(user == null) {
          ResponseEntity.status(401).body(ErrorCode.INVALID_USERNAME_OR_PASSWORD);
        }
        String token = jwtUtil.generateToken(user.getUser_id(), user.getUser_role());
        result.put("token", token);
        return ResponseEntity.ok().body(result);
    }
    @GetMapping("/csrf-token")
    public CsrfToken csrfToken(CsrfToken csrfToken) {
        return csrfToken;
    }
}
