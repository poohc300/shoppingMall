package com.example.shoppingMall.Company.model;
import lombok.Data;
import org.w3c.dom.Text;

@Data
public class Company {

    private int id; // 제조사 id
    private String name; // 제조사 이름
    private String address; // 제조사 주소
    private String contact_info; // 제조사 연락처 정보
}
