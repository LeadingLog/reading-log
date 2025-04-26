package com.example.demo.user.Service;

import com.example.demo.user.Entity.NaverTokenResponse;
import com.example.demo.user.Entity.RefreshToken;
import com.example.demo.user.Repository.RefreshTokenRepository;
import com.example.demo.user.Repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;

@Service
public class RefreshTokenService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository tokenRepository;
    private final ApiKeyService apiKey;

    public RefreshTokenService(UserRepository userRepository, RefreshTokenRepository tokenRepository, ApiKeyService apiKey) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.apiKey = apiKey;
    }


    // 갱신 토큰 저장
    public RefreshToken addToken(RefreshToken refreshToken) {
        return tokenRepository.save(refreshToken);
    }

    // 갱신 토큰 조회
    public ArrayList<RefreshToken>  getToken(Integer userId, String provider) {
        ArrayList<RefreshToken>  refreshToken = null;
        refreshToken = tokenRepository.findByUserIdAndProvider(userId, provider);

        // todo 갱신토큰 미조회 시 에러처리
        return refreshToken;
    }

    // 갱신 토큰으로 접근 토큰 재발급 요청
    public NaverTokenResponse getAccessTokenByRefreshToken(String refreshToken){

        // apiKey 값 전달받기
        String clientId = apiKey.getNaver_client_id();
        String clientSecret = apiKey.getNaver_client_secret();

        try {

            StringBuilder apiURL = new StringBuilder();
            apiURL.append("https://nid.naver.com/oauth2.0/token?");
            apiURL.append("&grant_type=refresh_token");    // 발급
            apiURL.append("&client_id=").append(clientId);
            apiURL.append("&client_secret=").append(clientSecret);
            apiURL.append("&refresh_token=").append(refreshToken);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(apiURL.toString(), HttpMethod.GET, null, String.class);

            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            NaverTokenResponse naverTokenResponse = objectMapper.readValue(responseBody, NaverTokenResponse.class);
            System.out.println("접근토큰 갱신 : " + responseBody);
            System.out.println("naverTOkenRefreshResponse : " + naverTokenResponse);

            return naverTokenResponse;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }


    // TODO 갱신 토큰 삭제
    public void deleteToken() {
        // https://developers.naver.com/docs/login/devguide/devguide.md#5-1-2-%EA%B0%B1%EC%8B%A0-%ED%86%A0%ED%81%B0%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC

    }


}
