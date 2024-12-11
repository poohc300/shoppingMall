package com.example.shoppingMall.Global.service;

import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    private RedisTemplate<String, Object> redisTemplate;

    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveUserSession(String username, String token) {
        redisTemplate.opsForValue().set(username, token, 1, TimeUnit.HOURS);
    }

    public String getUserSession(String username) {
        return (String) redisTemplate.opsForValue().get(username);
    }

    public void deleteUserSession(String username) {
        redisTemplate.delete(username);
    }
}
