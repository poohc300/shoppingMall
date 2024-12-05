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
    public String save(HashMap<String, Object> data) {
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
        return ordersResult > 0 && allProductsSaved ? newOrderId : "";
    }

    public List<Orders> findByCustomerId(int id) {
        // 1 주문 테이블 조회
        List<Orders> orders = ordersMapper.findOrdersByCustomerId(id);
        // 2 주문 테이블의 order_id로 주문상품 테이블 조회
        orders.forEach(order -> {
            List<OrdersProducts> ordersProducts = ordersMapper.findProductsByOrderId(order.getOrder_id());
            order.setOrdersProducts(ordersProducts);
        });

        return orders;
    }

    public Orders findByOrderId(String id) {
        Orders orders =  ordersMapper.findByOrderId(id);
        List<OrdersProducts> ordersProducts = ordersMapper.findProductsByOrderId(orders.getOrder_id());
        orders.setOrdersProducts(ordersProducts);

        return orders;
    }

    @Transactional
    public int updateProductsByOrderId(String orders_id, int orders_products_id, HashMap<String, Object> data) {
        /*
         * 주문에 속한 상품의 정보를 변경하는 API
         */
        int result = ordersMapper.updateProductsByOrderId(orders_id, orders_products_id, data);
        int ordersResult = 0;
        if(result > 0) {
            // orders_id로 주문상품 리스트 조회
            List<OrdersProducts> ordersProducts = ordersMapper.findProductsByOrderId(orders_id);
            // 주문상품 들의 금액 총합 계산
            int total_price = ordersProducts
                                .stream()
                                .mapToInt(product -> product.getPrice() * product.getQuantity())
                                .sum();
            // 주문의 주문총액 업데이트
            ordersResult = ordersMapper.updateOrdersTotalPrice(orders_id, total_price);

        }
        return result > 0 && ordersResult > 0 ? 1 : 0;
    }

    @Transactional
    public int updateOrdersStatus(String orders_id, HashMap<String, Object> data) {
        int result = ordersMapper.updateOrdersStatus(orders_id, data);
        return result;
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
