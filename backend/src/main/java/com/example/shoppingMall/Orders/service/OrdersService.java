package com.example.shoppingMall.Orders.service;

import com.example.shoppingMall.Orders.mapper.OrdersMapper;
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
        String category = data.get("category").toString();
        String newOrderId = generateOrderId(category);
        System.out.println(newOrderId);
        data.put("order_id", newOrderId);
        
        int result = ordersMapper.saveOrder(data);
        List<OrdersProducts> ordersProductsList = (List<OrdersProducts>) data.get("orders_products")
    }

    public String generateOrderId(String category) {
        /**
         * 주문번호 생성 로직
         *
         * 상품코드 + 현재날짜시간 밀리초 마지막 7자리 + 랜덤생성 2자리
         */
        long currentTimeMillis = System.currentTimeMillis();
        String timeStr = String.valueOf(currentTimeMillis);
        String reducedTimeStr = timeStr.substring(timeStr.length() - 7); // 밀리초 값의 마지막 7자리 사용
        Random random = new Random();
        int randomNum = 10 + random.nextInt(90); // 10부터 99까지의 랜덤 숫자 생성 (2자리)
        return category + reducedTimeStr + randomNum;
    }
}
