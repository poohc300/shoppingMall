package com.example.shoppingMall.Orders.model;
import lombok.Data;

@Data
public class OrdersProducts {
    private int id; // 주문 상품 정보
    private String order_id; // 주문 정보
    private int price; // 상품 금액
    private int quantity; // 상품 수량
}
