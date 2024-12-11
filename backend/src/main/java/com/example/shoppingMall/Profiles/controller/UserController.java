package com.example.shoppingMall.Profiles.controller;
import com.example.shoppingMall.Global.service.RedisService;
import com.example.shoppingMall.Global.utils.JwtUtil;
import com.example.shoppingMall.Profiles.model.User;
import com.example.shoppingMall.Profiles.service.UserService;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity signup (HashMap<String, Object> data) {
        int result = userService.registerUser(data);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity login (HashMap<String, Object> data) {
        User user = userService.authenticateUser(data);

        if(user != null) {
            String token = jwtUtil.generateToken(data.get("username").toString(), data.get("user_role").toString());

        }
        return ResponseEntity.ok(user);
    }
}
