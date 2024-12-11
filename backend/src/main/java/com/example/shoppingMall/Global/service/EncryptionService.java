package com.example.shoppingMall.Global.service;

import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EncryptionService {

    private final StringEncryptor stringEncryptor;

    @Autowired
    public EncryptionService(StringEncryptor stringEncryptor) {
        this.stringEncryptor = stringEncryptor;
    }

    public String encrypt(String data) {
        return stringEncryptor.encrypt(data);
    }

    public String decrypt(String encryptedData) {
        return stringEncryptor.decrypt(encryptedData);
    }
}
