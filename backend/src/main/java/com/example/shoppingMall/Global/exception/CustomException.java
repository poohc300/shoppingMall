package com.example.shoppingMall.Global.exception;

public class CustomException extends RuntimeException{

    private ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        // runtimeException에 이미 message를 포함하는 생성자가 있음
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
