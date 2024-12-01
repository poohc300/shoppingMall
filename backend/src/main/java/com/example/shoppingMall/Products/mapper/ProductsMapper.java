package com.example.shoppingMall.Products.mapper;

import com.example.shoppingMall.Products.model.Products;
import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ProductsMapper {

    Products findById(int id);
    List<Products> findAll();
    List<Products> findByCompanyId(int id);
    List<Products> searchProducts(@Param("query") String query);
    int save(HashMap<String,Object> data);
}
