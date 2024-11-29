package com.example.shoppingMall.Company.service;

import com.example.shoppingMall.Company.mapper.CompanyMapper;
import com.example.shoppingMall.Company.model.Company;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    @Autowired
    private CompanyMapper companyMapper;

    public Company findById(int id) {
        return companyMapper.findById(id);
    }
    public int save(HashMap<String, Object> data) {
        return companyMapper.save(data);
    }
}
