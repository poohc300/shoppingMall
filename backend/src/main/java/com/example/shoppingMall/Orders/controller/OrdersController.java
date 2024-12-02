package com.example.shoppingMall.Orders.controller;

import com.example.shoppingMall.Orders.model.Orders;
import com.example.shoppingMall.Orders.service.OrdersService;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/save")
    public int save(@RequestBody HashMap<String, Object> data) {
        return ordersService.save(data);
    }
}
