package com.example.shoppingMall.Global.config;

import jakarta.annotation.PostConstruct;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JasyptConfig {


    @Value("${jasypt.encryptor.password}")
       private String encryptedSecret;

    @Bean
    public StringEncryptor stringEncryptor() {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setPassword(encryptedSecret);
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        return encryptor;
    }
}
