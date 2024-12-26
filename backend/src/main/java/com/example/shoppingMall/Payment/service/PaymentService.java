package com.example.shoppingMall.Payment.service;

import com.example.shoppingMall.Payment.model.TossRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Value("${toss.secret_key}")
    private String secret_key;

    @Value("${toss.security_key}")
    private String security_key;

    public String handlePaymentSuccess(TossRequest payment) throws IOException, InterruptedException {
        String result = tossRequest(payment);
        return result;
    }

    public String tossRequest(TossRequest tossRequest) throws IOException, InterruptedException {

        ObjectMapper objectMapper = new ObjectMapper();
        String tossRequestString = objectMapper.writeValueAsString(tossRequest);
        System.out.println(tossRequestString);
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.tosspayments.com/v1/payments/confirm"))
            .header("Authorization", "Basic dGVzdF9za19ETEpPcG01UXJsUEJLS05ETlpvQXJQTmR4YlduOg==")
            .header("Content-Type", "application/json")
            .method("POST", HttpRequest.BodyPublishers.ofString(tossRequestString))
            .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(
            request,
            HttpResponse.BodyHandlers.ofString());

        return response.body();
    }
}
