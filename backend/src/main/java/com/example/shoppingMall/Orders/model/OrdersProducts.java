package com.example.shoppingMall.Orders.model;
import lombok.Data;

@Data
public class OrdersProducts {
    private int id; // 주문 상품 정보
    private String order_id; // 주문 정보
    private int price; // 상품 금액
    private int quantity; // 상품 수량
    private String product_name; // 상품 이름
    private String description; // 상품 설명
    private String category; // 상품 카테고리 코드
    private String category_name; // 상품 카테고리 이름
    private String image_url; // 상품 이미지
    private String manufacturer_name; // 제조사 이름
    private String manufacturer_address; // 제조사 주소
    private String manufacturer_contact_info; // 제조사 연락처
}

