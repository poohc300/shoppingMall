package com.example.shoppingMall.Orders.mapper;

import com.example.shoppingMall.Orders.model.Orders;
import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrdersMapper {

    int saveOrders(HashMap<String, Object> orderResult);
    int saveOrdersProducts(HashMap<String, Object> productResult);
    List<Orders> findByCustomerId(int id);
}
