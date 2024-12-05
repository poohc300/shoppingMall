package com.example.shoppingMall.Orders.controller;

import com.example.shoppingMall.Orders.model.Orders;
import com.example.shoppingMall.Orders.service.OrdersService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String save(@RequestBody HashMap<String, Object> data) {
        return ordersService.save(data);
    }

    @GetMapping("/customer/{customer_id}")
    public List<Orders> findByCustomerId(@PathVariable int customer_id) {
        return ordersService.findByCustomerId(customer_id);
    }

    @GetMapping("/{orders_id}")
    public Orders findByOrderId(@PathVariable String orders_id) { return ordersService.findByOrderId(orders_id);}

    @PatchMapping("/{orders_id}/products/{orders_products_id}")
    public int updateProductsByOrderId(
        @PathVariable String orders_id,
        @PathVariable int orders_products_id,
        @RequestBody HashMap<String, Object> data) {
        return ordersService.updateProductsByOrderId(orders_id, orders_products_id, data);}
    @PatchMapping("/{orders_id}/status")
    public int updateOrdersStatus(@PathVariable String orders_id, @RequestBody HashMap<String, Object> data) {
        return ordersService.updateOrdersStatus(orders_id, data);
    }
}
