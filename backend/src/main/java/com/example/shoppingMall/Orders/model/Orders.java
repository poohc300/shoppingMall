package com.example.shoppingMall.Orders.model;
import java.util.List;
import lombok.Data;

@Data
public class Orders {
    private int id; // 주문 시퀀스
    private String order_id; // 주문 번호
    private int customer_id; // 고객 번호
    private String status; // 주문 상태
    private double total_price; // 주문 총 금액
    private List<OrdersProducts> ordersProducts; // 주문 상품 정보
}
