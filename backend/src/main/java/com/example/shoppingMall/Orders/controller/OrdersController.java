package com.example.shoppingMall.Orders.controller;

import com.example.shoppingMall.Orders.model.Orders;
import com.example.shoppingMall.Orders.service.OrdersService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody HashMap<String, Object> data) {
       String result = ordersService.save(data);
       return ResponseEntity.ok(result);
    }

    @GetMapping("/customer/{customer_id}")
    public ResponseEntity findByCustomerId(@PathVariable int customer_id) {
       List<Orders> orders = ordersService.findByCustomerId(customer_id);
       return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orders_id}")
    public ResponseEntity findByOrderId(@PathVariable String orders_id) {
        Orders orders = ordersService.findByOrderId(orders_id);
        return ResponseEntity.ok(orders);
    }

    @PatchMapping("/{orders_id}/products/{orders_products_id}")
    public ResponseEntity updateProductsByOrderId(
        @PathVariable String orders_id,
        @PathVariable int orders_products_id,
        @RequestBody HashMap<String, Object> data) {
        int result = ordersService.updateProductsByOrderId(orders_id, orders_products_id, data);
        return ResponseEntity.ok(result);
    }
    @PatchMapping("/{orders_id}/status")
    public ResponseEntity updateOrdersStatus(@PathVariable String orders_id, @RequestBody HashMap<String, Object> data) {
        int result =  ordersService.updateOrdersStatus(orders_id, data);
        return ResponseEntity.ok(result);
    }
}
