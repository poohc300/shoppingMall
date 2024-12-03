package com.example.shoppingMall.Orders.mapper;

import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrdersMapper {

    int saveOrders(HashMap<String, Object> orderResult);
    int saveOrdersProducts(HashMap<String, Object> productResult);
}
