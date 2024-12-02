package com.example.shoppingMall.Orders.mapper;

import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrdersMapper {

    int save(HashMap<String, Object> result);
}
