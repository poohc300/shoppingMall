package com.example.shoppingMall.Company.controller;

import com.example.shoppingMall.Company.model.Company;
import com.example.shoppingMall.Company.service.CompanyService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
public class CompanyController {


    @Autowired
    private CompanyService companyService;

    @GetMapping("/{id}")
    public Company findById(@PathVariable int id) {
        return companyService.findById(id);
    }
    @PostMapping("/save")
    public int save(@RequestBody HashMap<String,Object> data) {
        return companyService.save(data);
    }
}
