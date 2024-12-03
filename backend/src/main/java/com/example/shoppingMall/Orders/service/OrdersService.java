package com.example.shoppingMall.Orders.service;

import com.example.shoppingMall.Orders.mapper.OrdersMapper;
import com.example.shoppingMall.Orders.model.Orders;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.shoppingMall.Orders.model.OrdersProducts;;

@Service
public class OrdersService {


    @Autowired
    private OrdersMapper ordersMapper;

    @Transactional
    public int save(HashMap<String, Object> data) {
        String newOrderId = generateOrderId();
        data.put("order_id", newOrderId);

        System.out.println(data);

        int ordersResult = ordersMapper.saveOrders(data);

        List<HashMap<String, Object>> ordersProductsList = (List<HashMap<String, Object>>) data.get("ordersProducts");
        boolean allProductsSaved = true;

        for (HashMap<String, Object> product : ordersProductsList) {
            product.put("order_id", newOrderId);
            product.put("product_id", product.get("id"));
            int productsResult = ordersMapper.saveOrdersProducts(product);

            if (productsResult == 0) {
                allProductsSaved = false;
            }
        }
        return ordersResult > 0 && allProductsSaved ? 1 : 0;
    }

    public List<Orders> findByCustomerId(int id) {
        return ordersMapper.findByCustomerId(id);
    }

    public String generateOrderId() {
        /**
         * 주문번호 생성 로직
         *
         * 현재날짜시간 밀리초 마지막 10자리 + 랜덤생성 4자리
         */
        long currentTimeMillis = System.currentTimeMillis();
        String timeStr = String.valueOf(currentTimeMillis);
        String reducedTimeStr = timeStr.substring(timeStr.length() - 10);
        Random random = new Random();
        int randomNum = 1000 + random.nextInt(9000);

        return  reducedTimeStr + randomNum;
    }
}
