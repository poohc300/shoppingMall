package com.example.shoppingMall.Products.model;

import lombok.Data;
import org.w3c.dom.Text;

@Data
public class Products {
    private int id; // 상품 ID
    private String name; // 상품 이름
    private Double price; // 상품 가격
    private String description; // 상품 설명
    private int manufacturer_id; // 제조사 ID
    private String manufacturer_nm; // 제조사 이름
    private Double discount; // 할인율
    private String image_url; // 상품 이미지 URL
    private String status; // 판매상태
}
