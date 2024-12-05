package com.example.shoppingMall.Orders.mapper;

import com.example.shoppingMall.Orders.model.Orders;
import com.example.shoppingMall.Orders.model.OrdersProducts;
import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrdersMapper {

    int saveOrders(HashMap<String, Object> orderResult);
    int saveOrdersProducts(HashMap<String, Object> productResult);
    List<Orders> findOrdersByCustomerId(int customer_id);
    List<OrdersProducts> findProductsByOrderId(String orders_id);
    Orders findByOrderId(String orders_id);
    int updateProductsByOrderId(String orders_id, int orders_products_id, HashMap<String, Object> data);
    int updateOrdersTotalPrice(String orders_id, int total_price);
    int updateOrdersStatus(String orders_id, HashMap<String, Object> data);
}
