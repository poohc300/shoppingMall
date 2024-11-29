package com.example.shoppingMall.Company.mapper;

import com.example.shoppingMall.Company.model.Company;
import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CompanyMapper {

    Company findById(int id);
    int save(HashMap<String, Object> data);
}
