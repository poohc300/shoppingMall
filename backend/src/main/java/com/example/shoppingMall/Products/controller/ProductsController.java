package com.example.shoppingMall.Products.controller;

import com.example.shoppingMall.Products.model.Products;
import com.example.shoppingMall.Products.service.ProductsService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @GetMapping("/{id}")
    public Products findById(@PathVariable int id) {
        return productsService.findById(id);
    }

    @GetMapping("/all")
    public List<Products> findAll() {
        return productsService.findAll();
    }
    @GetMapping("/company/{id}")
    public List<Products> findByCompanyId(@PathVariable int id) {
        return productsService.findByCompanyId(id);
    }

    @PostMapping("/save")
    public int save(@RequestBody HashMap<String, Object> data) {
        return productsService.save(data);
    }

    @GetMapping("/search")
    public List<Products> searchProducts(@RequestParam String query) {
        return productsService.searchProducts(query);
    }
}
