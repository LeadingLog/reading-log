package com.example.demo.user.Service;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Getter
@Service
public class ApiKeyService {

 @Value("${NAVER_CLIENT_ID}")
private String naver_client_id;

@Value("${NAVER_CLIENT_SECRET}")
private String naver_client_secret;

@Value("${NAVER_REDIRECT_URI}")
private String naver_redirect_uri;

@Value("${KAKAO_API_KEY}")
private String kakao_api_key;

@Value("${KAKAO_REDIRECT_URI}")
private String kakao_redirect_uri;



}
