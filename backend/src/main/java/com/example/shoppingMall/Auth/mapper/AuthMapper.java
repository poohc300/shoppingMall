package com.example.shoppingMall.Auth.mapper;

import com.example.shoppingMall.Auth.model.User;
import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthMapper {

    int signup(HashMap<String, Object> data);
    User findByUserId(String user_id);
}
