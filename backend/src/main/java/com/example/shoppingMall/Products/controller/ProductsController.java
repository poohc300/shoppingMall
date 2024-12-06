package com.example.shoppingMall.Products.controller;

import com.example.shoppingMall.Products.model.Products;
import com.example.shoppingMall.Products.service.ProductsService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Products> findById(@PathVariable int id) {
        Products products =  productsService.findById(id);
        return ResponseEntity.ok(products);
 }

    @GetMapping("/all")
    public ResponseEntity<List<Products>> findAll() {
       List<Products> products =  productsService.findAll();
       return ResponseEntity.ok(products);
    }

    @GetMapping("/company/{id}")
    public ResponseEntity<List<Products>> findByCompanyId(@PathVariable int id) {
        List<Products> products = productsService.findByCompanyId(id);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/save")
     public ResponseEntity save(@RequestBody HashMap<String, Object> data) {
        int result = productsService.save(data);
        return ResponseEntity.ok(result);
     }

    @GetMapping("/search")
    public ResponseEntity<List<Products>> searchProducts(
        @RequestParam String query,
        @RequestParam String category
    ) {
        List<Products> products =  productsService.searchProducts(query, category);
        return ResponseEntity.ok(products);
    }
}
