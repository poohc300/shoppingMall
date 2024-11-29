package com.example.shoppingMall.Products.mapper;

import com.example.shoppingMall.Products.model.Products;
import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductsMapper {

    Products findById(int id);
    List<Products> findAll();
    List<Products> findByCompanyId(int id);
    int save(HashMap<String,Object> data);
}
