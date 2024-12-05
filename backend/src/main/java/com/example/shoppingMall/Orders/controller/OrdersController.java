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

    @GetMapping("/customer/{id}")
    public List<Orders> findByCustomerId(@PathVariable int id) {
        return ordersService.findByCustomerId(id);
    }

    @GetMapping("/{id}")
    public Orders findByOrderId(@PathVariable String id) { return ordersService.findByOrderId(id);}

    @PatchMapping("/{order_id}/products/{orders_products_id}")
    public int updateProductsByOrderId(
        @PathVariable String order_id,
        @PathVariable int orders_products_id,
        @RequestBody HashMap<String, Object> data) {
        return ordersService.updateProductsByOrderId(order_id, orders_products_id, data);}
    @PatchMapping("/{order_id}/status")
    public int updateOrdersStatus(@PathVariable String order_id, @RequestBody HashMap<String, Object> data) {
        return ordersService.updateOrdersStatus(order_id, data);
    }
}
