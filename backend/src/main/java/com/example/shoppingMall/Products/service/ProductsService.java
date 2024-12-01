package com.example.shoppingMall.Products.service;

import com.example.shoppingMall.Products.mapper.ProductsMapper;
import com.example.shoppingMall.Products.model.Products;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsService {

    @Autowired
    private ProductsMapper productsMapper;

    public Products findById(int id) {
        return productsMapper.findById(id);
    }

    public List<Products> findAll() {
        return productsMapper.findAll();
    }
    public List<Products> findByCompanyId(int id) { return productsMapper.findByCompanyId(id);}
    public int save(HashMap<String, Object> data) {
        return productsMapper.save(data);
    }
    public List<Products> searchProducts(String query) {
        return productsMapper.searchProducts(query);
    }
}
