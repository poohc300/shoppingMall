package com.example.shoppingMall.Profiles.mapper;

import com.example.shoppingMall.Profiles.model.User;
import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthMapper {

    int signup(HashMap<String, Object> data);
    User findByUsername(String username);
}
