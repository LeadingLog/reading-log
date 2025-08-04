package com.example.demo.user.Service;

import com.example.demo.code.Provider;
import com.example.demo.user.Entity.KakaoTokenResponse;
import com.example.demo.user.Entity.NaverTokenResponse;
import com.example.demo.user.Entity.RefreshToken;
import com.example.demo.user.Repository.RefreshTokenRepository;
import com.example.demo.user.Repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

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
    public ArrayList<RefreshToken>  getToken(Integer userId, Provider provider) {
        ArrayList<RefreshToken>  refreshToken = null;
        refreshToken = tokenRepository.findByUserIdAndProvider(userId, provider);

        // todo 갱신토큰 미조회 시 에러처리
        return refreshToken;
    }

    public RefreshToken findByUserId(Integer userId) {
        return tokenRepository.findByUserId(userId);
    }

    // 갱신 토큰으로 접근 토큰 재발급 요청
    public NaverTokenResponse getNaverAccessTokenByRefreshToken(String refreshToken){

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

    public KakaoTokenResponse getKakaoAccessTokenByRefreshToken(String refreshToken) throws JsonProcessingException {
        String kakaoApiKey = apiKey.getKakao_api_key();
        String redirectUri = apiKey.getKakao_redirect_uri();
        String clientSecret = apiKey.getNaver_client_secret();

        String kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "refresh_token"); // 발급
        params.add("client_id", kakaoApiKey);
        params.add("redirect_uri", redirectUri);
        params.add("refresh_token", refreshToken);
        params.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        RestTemplate restTemplate = new RestTemplate();
        // TODO 경로 requestentity 로 옮겨주기
        ResponseEntity<String> response = restTemplate
                .exchange(kakaoTokenUrl, HttpMethod.POST, kakaoTokenRequest, String.class);
        // JSON 결과값 반환
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoTokenResponse kakaoTokenResponse = objectMapper.readValue(responseBody, KakaoTokenResponse.class);
        System.out.println("접근 토큰22 by refreshToken : " + response.getBody());
        System.out.println("kakaoTokenResponse : " + kakaoTokenResponse);

        return kakaoTokenResponse;
    }


    // TODO 갱신 토큰 삭제
    public void deleteToken(Integer userId) {
        // https://developers.naver.com/docs/login/devguide/devguide.md#5-1-2-%EA%B0%B1%EC%8B%A0-%ED%86%A0%ED%81%B0%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC
        tokenRepository.deleteByUserId(userId);
    }

    // 연동 소셜 로그인 사이트 조회
    public Provider findProviderByUserId(Integer userId) {
        RefreshToken refreshToken = tokenRepository.findByUserId(userId);
        return refreshToken.getProvider();
    }

    // 토큰 수정
    public RefreshToken updateToken(Integer userId, String provider, String newToken) {
        RefreshToken refreshToken = tokenRepository.getReferenceById(userId);

        // refershToken 이 새 토큰과 다를 경우
        if (Objects.equals(provider, refreshToken.getProvider()) && !Objects.equals(newToken, refreshToken.getToken())) {
            refreshToken.setToken(newToken);
            System.out.println(userId + " 회원 " + provider +" 토큰 값 변경");
            tokenRepository.save(refreshToken);
        }
        return refreshToken;
    }

}
