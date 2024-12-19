package com.example.shoppingMall.Global.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    private RedisTemplate<String, Object> redisTemplate;

    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveUserSession(String user_id, String access_token, String refresh_token) {
        HashMap<String, Object> tokens = new HashMap<>();
        tokens.put("accessToken", access_token);
        tokens.put("refreshToken", refresh_token);
        redisTemplate.opsForValue().set(user_id, tokens, 1, TimeUnit.HOURS);
    }

    public HashMap<String, Object> getUserSession(String user_id) {
        return (HashMap<String, Object>) redisTemplate.opsForValue().get(user_id);
    }

    public void deleteUserSession(String user_id) {
        redisTemplate.delete(user_id);
    }
}
