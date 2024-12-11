package com.example.shoppingMall.Profiles.model;
import lombok.Data;

@Data
public class User {
    private int id; // 회원 시퀀스
    private String username; // 회원 이름
    private String user_password; // 회원 비밀번호
    private String email; // 회원 이메일
    private String user_role; // 회원분류코드
    private String user_role_name; // 회원분류명칭
}
