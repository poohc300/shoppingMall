package com.example.shoppingMall.Payment.controller;

import com.example.shoppingMall.Payment.model.TossRequest;
import com.example.shoppingMall.Payment.service.PaymentService;
import java.io.IOException;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/confirm")
    public ResponseEntity confirm(@RequestBody TossRequest tossRequest) throws IOException, InterruptedException {

        String result = paymentService.handlePaymentSuccess(tossRequest);

        return ResponseEntity.ok().body(result);
    }
}
