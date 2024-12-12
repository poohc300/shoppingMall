package com.example.shoppingMall.Global.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@JsonFormat(shape = Shape.OBJECT)
public enum ErrorCode {
    // User
    USER_NOT_FOUND(404, "1001", "없는 유저입니다."),
    USER_DUPLICATED(409, "1002", "중복된 유저입니다."),
    INVALID_USERNAME_OR_PASSWORD(400, "1003", "잘못입력된 유저정보입니다."),
    REGISTRATION_FAILED(400, "1004", "유저 생성에 실패하였습니다."),

    // Products
    PRODUCTS_NOT_FOUND(404, "2001", "상품이 존재하지 않습니다."),
    INVALID_PRODUCT_DATA(400, "2002", "상품 입력이 잘못되었습니다."),

    // Orders
    EMPTY_ORDERS_LISTS(404, "3001", "주문내역이 없습니다."),
    INVALID_ORDERS_DATA(400, "3002", "주문 입력이 잘못되었습니다."),

    // OrdersProducts
    EMPTY_ORDERS_PRODUCTS_LISTS(404, "4001", "주문 상품이 없습니다"),
    INVALID_ORDERS_PRODUCTS_DATA(400, "4002", "주문 상품 입력이 잘못되었습니다."),

    // COMMON
    PAGE_NOT_FOUND(404, "9001", "존재하지 않는 페이지입니다.");


    private final int status; // http 상태 응답 코드
    private final String code; // 코드
    private final String message; // 에러 메시지

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }
    public String getCode() {
        return code;
    }
    public String getMessage() {
        return message;
    }
}
