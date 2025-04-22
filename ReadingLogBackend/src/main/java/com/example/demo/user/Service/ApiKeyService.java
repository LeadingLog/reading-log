package com.example.demo.user.Service;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Getter
@Service
public class ApiKeyService {
    @Value("${naver-client-id}")
    private String naver_client_id;

    @Value("${naver-client-secret}")
    private String naver_client_secret;

    @Value("${naver-redirect-uri}")
    private String naver_redirect_uri;


    @Value("${kakao-api-key}")
    private String kakao_api_key;

    @Value("${kakao-redirect-uri}")
    private String kakao_redirect_uri;


}
