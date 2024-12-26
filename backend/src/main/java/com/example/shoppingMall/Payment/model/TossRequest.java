package com.example.shoppingMall.Payment.model;
import lombok.Data;

@Data
public class TossRequest {

    private String paymentKey;
    private int amount;
    private String orderId;
}
