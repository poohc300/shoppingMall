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

    public void saveUserSession(String user_id, String token) {
        redisTemplate.opsForValue().set(user_id, token, 1, TimeUnit.HOURS);
    }

    public String getUserSession(String user_id) {
        return (String) redisTemplate.opsForValue().get(user_id);
    }

    public void deleteUserSession(String user_id) {
        redisTemplate.delete(user_id);
    }
}
