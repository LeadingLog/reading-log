package com.example.demo.user.Service;

import com.example.demo.code.ErrorCode;
import com.example.demo.code.Provider;
import com.example.demo.exception.CustomException;
import com.example.demo.response.ResponseService;
import com.example.demo.user.Entity.NaverProfile;
import com.example.demo.user.Entity.NaverTokenResponse;
import com.example.demo.user.Entity.RefreshToken;
import com.example.demo.user.Entity.User;
import com.example.demo.user.Repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class NaverService {

    private final ApiKeyService apiKey;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final ResponseService responseService;


    public NaverService(ApiKeyService apiKey, UserRepository userRepository, RefreshTokenService refreshTokenService, ResponseService responseService) {
        this.apiKey = apiKey;
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
        this.responseService = responseService;
    }

    // 네이버 회원 정보 반환
    @Transactional
    public User prepareUserFromProfile(NaverProfile userProfile) {
        User user = new User();
        System.out.println("네이버 회원 정보 처리");

        user.setUserUUID(userProfile.getId());
        user.setNickname(userProfile.getNickname());
        user.setUserEmail(userProfile.getEmail());

        user.setPassword(UUID.randomUUID().toString());

        return user;

    }


    // 1. callback 이후 접근 신규 토큰 발급 요청
    @Transactional
    public NaverTokenResponse getNewNaverAccessToken(String code, String state) {
        Map<String, Object> result = new HashMap<>();

        String clientId = apiKey.getNaver_client_id();
        String clientSecret = apiKey.getNaver_client_secret();

        try {
            StringBuilder apiURL = new StringBuilder();
            apiURL.append("https://nid.naver.com/oauth2.0/token?");
            apiURL.append("&grant_type=authorization_code");    // 발급
            apiURL.append("&client_id=").append(clientId);
            apiURL.append("&client_secret=").append(clientSecret);
            apiURL.append("&code=").append(code);
            apiURL.append("&state=").append(state);


            RestTemplate restTemplate = new RestTemplate();
            // TODO 경로 requestentity 로 옮겨주기
            ResponseEntity<String> response = restTemplate.exchange(apiURL.toString(), HttpMethod.GET, null, String.class);
            // JSON 결과값 반환
            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            NaverTokenResponse naverTokenResponse = objectMapper.readValue(responseBody, NaverTokenResponse.class);
            System.out.println("접근 토큰11 : " + response.getBody());
            System.out.println("naverTokenResponse : "+ naverTokenResponse);

            return naverTokenResponse;

            // TODO 요청 실패 시 처리 필요

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // 접근 토큰으로 프로필 조회 요청
    @Transactional
    public NaverProfile getNaverUserInfo(String accessToken) throws URISyntaxException, JsonProcessingException {
        StringBuilder apiURL = new StringBuilder();
        apiURL.append("https://openapi.naver.com/v1/nid/me");

        RestTemplate restTemplate = new RestTemplate();

        // HttpHeader
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(new URI(apiURL.toString()), HttpMethod.POST, entity, String.class);

        // 응답 처리
        String responseBody = response.getBody();
        System.out.println(responseBody);

        ObjectMapper obm = new ObjectMapper();
        Map<String, Object> responseMap = obm.readValue(responseBody, Map.class);
        Map<String, Object> userProfile = (Map<String, Object>) responseMap.get("response");

        NaverProfile naverProfile = new NaverProfile();
        naverProfile.setId((String) userProfile.get("id"));
        naverProfile.setNickname((String) userProfile.get("nickname"));
        naverProfile.setEmail((String) userProfile.get("email"));

        return naverProfile;

    }


    // 회원 탈퇴
    @Transactional
    public void unlinkNaverUser(Integer userId) throws JsonProcessingException {

        // 갱신 토큰 조회
        RefreshToken refreshToken = refreshTokenService.findByUserId(userId);
//        String token = String.valueOf(refreshTokens.get(0).getToken());
        String token = refreshToken.getToken();
        Provider provider = refreshToken.getProvider();

        // 네이버 토큰 재발급
        NaverTokenResponse naverTokenResponse = refreshTokenService.getNaverAccessTokenByRefreshToken(token);
        String accessToken = naverTokenResponse.getAccessToken();

        // 접근토큰으로 네이버 회원탈퇴
        String clientId = apiKey.getNaver_client_id();
        String clientSecret = apiKey.getNaver_client_secret();
        StringBuilder apiURL = new StringBuilder();
        apiURL.append("https://nid.naver.com/oauth2.0/token?");
        apiURL.append("&grant_type=delete");    // 발급
        apiURL.append("&client_id=").append(clientId);
        apiURL.append("&client_secret=").append(clientSecret);
        apiURL.append("&access_token=").append(accessToken);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(apiURL.toString(), HttpMethod.GET, null, String.class);

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        NaverTokenResponse naverDeleteResponse = objectMapper.readValue(responseBody, NaverTokenResponse.class);
        System.out.println("접근토큰 갱신 : " + responseBody);
        System.out.println("naverTOkenRefreshResponse : " + naverDeleteResponse);

        if (naverDeleteResponse == null || !"success".equals(naverDeleteResponse.getResult())) {
            throw new CustomException(ErrorCode.NAVER_UNLINK_FAILED);
        }

    }
}
