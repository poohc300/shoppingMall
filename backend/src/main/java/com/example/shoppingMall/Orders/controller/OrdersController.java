package com.example.shoppingMall.Orders.controller;

import com.example.shoppingMall.Orders.model.Orders;
import com.example.shoppingMall.Orders.service.OrdersService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/save")
    public int save(@RequestBody HashMap<String, Object> data) {
        return ordersService.save(data);
    }

    @GetMapping("/customer/{id}")
    public List<Orders> findByCustomerId(@PathVariable int id) {
        return ordersService.findByCustomerId(id);
    }
}
