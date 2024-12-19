package com.example.shoppingMall.Orders.service;

import com.example.shoppingMall.Auth.mapper.AuthMapper;
import com.example.shoppingMall.Auth.model.User;
import com.example.shoppingMall.Orders.mapper.OrdersMapper;
import com.example.shoppingMall.Orders.model.Orders;
import com.example.shoppingMall.Global.exception.CustomException;
import com.example.shoppingMall.Global.exception.ErrorCode;
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

    @Autowired
    private AuthMapper authMapper;

    @Transactional
    public String save(HashMap<String, Object> data) {
        String newOrderId = generateOrderId();
        int customer_id = getUserIdNumberByUserId(data.get("customer_id").toString());
        data.put("orders_id", newOrderId);
        data.put("customer_id", customer_id);

        int ordersResult = ordersMapper.saveOrders(data);
        if(ordersResult == 0) {
            throw new CustomException(ErrorCode.INVALID_ORDERS_DATA);
        }

        List<HashMap<String, Object>> ordersProductsList = (List<HashMap<String, Object>>) data.get("ordersProducts");
        if(ordersProductsList.isEmpty()) {
            throw new CustomException(ErrorCode.EMPTY_ORDERS_LISTS);
        }

        for (HashMap<String, Object> product : ordersProductsList) {
            product.put("orders_id", newOrderId);
            product.put("product_id", product.get("id"));
            int productsResult = ordersMapper.saveOrdersProducts(product);

            if (productsResult == 0) {
                throw  new CustomException(ErrorCode.INVALID_ORDERS_PRODUCTS_DATA);
            }
        }
        return newOrderId;
    }

    public List<Orders> findByCustomerId(int customer_id) {
        // 1 주문 테이블 조회
        List<Orders> orders = ordersMapper.findOrdersByCustomerId(customer_id);
        if(orders.isEmpty()) {
            throw new CustomException(ErrorCode.EMPTY_ORDERS_LISTS);
        }
        // 2 주문 테이블의 order_id로 주문상품 테이블 조회
        orders.forEach(order -> {
            List<OrdersProducts> ordersProducts = ordersMapper.findProductsByOrderId(order.getOrder_id());
            if(ordersProducts.isEmpty()) {
                throw new CustomException(ErrorCode.EMPTY_ORDERS_PRODUCTS_LISTS);
            }
            order.setOrdersProducts(ordersProducts);
        });

        return orders;
    }

    public Orders findByOrderId(String order_id) {
        Orders orders =  ordersMapper.findByOrderId(order_id);
        if(orders == null) {
            throw new CustomException(ErrorCode.EMPTY_ORDERS_LISTS);
        }
        List<OrdersProducts> ordersProducts = ordersMapper.findProductsByOrderId(orders.getOrder_id());
        if(ordersProducts.isEmpty()) {
            throw new CustomException(ErrorCode.EMPTY_ORDERS_PRODUCTS_LISTS);
        }
        orders.setOrdersProducts(ordersProducts);

        return orders;
    }

    @Transactional
    public int updateProductsByOrderId(String orders_id, int orders_products_id, HashMap<String, Object> data) {
        /*
         * 주문에 속한 상품의 정보를 변경하는 API
         */
        int result = ordersMapper.updateProductsByOrderId(orders_id, orders_products_id, data);

        if(result == 0) {
            throw new CustomException(ErrorCode.INVALID_ORDERS_PRODUCTS_DATA);
        }

        if(result > 0) {
            // orders_id로 주문상품 리스트 조회
            List<OrdersProducts> ordersProducts = ordersMapper.findProductsByOrderId(orders_id);

            if(ordersProducts.isEmpty()) {
                throw new CustomException(ErrorCode.EMPTY_ORDERS_PRODUCTS_LISTS);
            }
            // 주문상품 들의 금액 총합 계산
            int total_price = ordersProducts
                                .stream()
                                .mapToInt(product -> product.getPrice() * product.getQuantity())
                                .sum();
            // 주문의 주문총액 업데이트
            int ordersResult = ordersMapper.updateOrdersTotalPrice(orders_id, total_price);
            if(ordersResult == 0) {
                throw new CustomException(ErrorCode.INVALID_ORDERS_DATA);
            }
        }
        return 1;
    }

    @Transactional
    public int updateOrdersStatus(String orders_id, HashMap<String, Object> data) {
        int result = ordersMapper.updateOrdersStatus(orders_id, data);
        if(result == 0) {
            throw new CustomException(ErrorCode.INVALID_ORDERS_DATA);
        }
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

    public int getUserIdNumberByUserId(String user_id) {
        User user = authMapper.findByUserId(user_id);
        return user.getId();
    }
}
