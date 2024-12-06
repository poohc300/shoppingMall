package com.example.shoppingMall.Products.service;

import com.example.shoppingMall.Products.mapper.ProductsMapper;
import com.example.shoppingMall.Products.model.Products;
import com.example.shoppingMall.exception.CustomException;
import com.example.shoppingMall.exception.ErrorCode;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsService {

    @Autowired
    private ProductsMapper productsMapper;

    public Products findById(int id) {
        Products products = productsMapper.findById(id);
        if(products == null) {
            throw new CustomException(ErrorCode.PRODUCTS_NOT_FOUND);
        }
        return products;
    }

    public List<Products> findAll() {
        List<Products> productsList =  productsMapper.findAll();
        if(productsList.isEmpty()) {
            throw new CustomException(ErrorCode.PRODUCTS_NOT_FOUND);
        }
        return productsList;
    }
    public List<Products> findByCompanyId(int id) {
        List<Products> productsList =  productsMapper.findByCompanyId(id);
        if(productsList.isEmpty()) {
            throw new CustomException(ErrorCode.PRODUCTS_NOT_FOUND);
        }
        return productsList;
    }
    public int save(HashMap<String, Object> data) {
        int result = productsMapper.save(data);
        if(result == 0) {
            throw new CustomException(ErrorCode.INVALID_PRODUCT_DATA);
        }
        return result;
    }
    public List<Products> searchProducts(String query, String category) {
        List<Products> productsList = productsMapper.searchProducts(query, category);
        if(productsList.isEmpty()) {
            throw new CustomException(ErrorCode.PRODUCTS_NOT_FOUND);
        }
        return productsList;
    }
}
