package com.example.shoppingMall;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShoppingMallApplication implements ApplicationRunner {
	@Value("${jwt.secret}")
    private String jwtSecret;

	public static void main(String[] args) {
		SpringApplication.run(ShoppingMallApplication.class, args);
	}
	@Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("JWT Secret: " + jwtSecret);
    }
} 
