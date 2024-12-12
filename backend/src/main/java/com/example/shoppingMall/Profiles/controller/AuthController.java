package com.example.shoppingMall.Profiles.controller;
import com.example.shoppingMall.Global.utils.JwtUtil;
import com.example.shoppingMall.Profiles.model.User;
import com.example.shoppingMall.Profiles.service.AuthService;
import java.util.HashMap;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity signup (HashMap<String, Object> data) {
        String result = authService.registerUser(data);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity login (HashMap<String, Object> data) {
        User user = authService.authenticateUser(data);

        if(user != null) {
            String token = jwtUtil.generateToken(data.get("username").toString(), data.get("user_role").toString());

        }
        return ResponseEntity.ok(user);
    }
}
