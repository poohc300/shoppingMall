package com.example.shoppingMall.Global.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /* ControllerAdvice: 글로벌 예외처리를 제공하기 위해 사용되는 어노테이션
     * RestControllerAdvice: ControllerAdvice에 ResponeBody가 적용됨
     * 하나의 클래스로 모든 컨트롤러에 대한 전역적인 예외처리 가능
     * try catch문 도배안해도 됨
     */
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleException (CustomException customException) {
        HttpHeaders resHeaders = new HttpHeaders();
        resHeaders.add("Content-Type", "application/json;charset=UTF-8");

        ErrorCode errorCode = customException.getErrorCode();
        ErrorResponse errorResponse = new ErrorResponse(errorCode);
        return new ResponseEntity<>(errorResponse, resHeaders, HttpStatus.resolve(errorCode.getStatus()));
    }
}
