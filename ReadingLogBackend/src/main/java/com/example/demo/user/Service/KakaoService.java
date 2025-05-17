package com.example.demo.user.Service;

import com.example.demo.user.Entity.KakaoProfile;
import com.example.demo.user.Entity.KakaoTokenResponse;
import com.example.demo.user.Entity.NaverProfile;
import com.example.demo.user.Entity.NaverTokenResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
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
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;


@Service
public class KakaoService {


    private final ApiKeyService apiKey;

    public KakaoService(ApiKeyService apiKey) {
        this.apiKey = apiKey;
    }

    @Transactional
    public KakaoTokenResponse getNewKakaoAccessToken(String code) {
        Map<String, Object> result = new HashMap<>();

        String kakaoApiKey = apiKey.getKakao_api_key();
        String redirectUri = apiKey.getKakao_redirect_uri();

        try {
            String kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code"); // 발급
            params.add("client_id", kakaoApiKey);
            params.add("redirect_uri", redirectUri);
            params.add("code", code);

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

            RestTemplate restTemplate = new RestTemplate();
            // TODO 경로 requestentity 로 옮겨주기
            ResponseEntity<String> response = restTemplate
                    .exchange(kakaoTokenUrl, HttpMethod.POST, kakaoTokenRequest, String.class);
            // JSON 결과값 반환
            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            KakaoTokenResponse kakaoTokenResponse = objectMapper.readValue(responseBody, KakaoTokenResponse.class);
            System.out.println("접근 토큰22 : " + response.getBody());
            System.out.println("kakaoTokenResponse : " + kakaoTokenResponse);

            return kakaoTokenResponse;

            // TODO 요청 실패 시 처리 필요

            /*
            "{"error":"invalid_grant","error_description":"authorization code not found for code=Aq0FvR0rbKsAmFQYl_Nt7tUsngr803DpGWmV-oF1D7kmMyGWxlYJ9AAAAAQKFxBvAAABlr58vB4h5oEAb4_jFQ","error_code":"KOE320"}"
             */
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    @Transactional
    public KakaoProfile getKakaoUserInfo(String accessToken) throws URISyntaxException, JsonProcessingException {
        String kakaourl = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String,String>> kakaoProfileRequest = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        // TODO 경로 requestentity 로 옮겨주기
        ResponseEntity<String> response = restTemplate
                .exchange(kakaourl, HttpMethod.POST, kakaoProfileRequest, String.class);

        // 응답 처리
        String responseBody = response.getBody();
        System.out.println(responseBody);

//        KakaoProfile kakaoProfile = new KakaoProfile(response.getBody());
//        System.out.println(kakaoProfile);

        ObjectMapper obm = new ObjectMapper();
        Map<String, Object> responseMap = obm.readValue(responseBody, Map.class);
//        Map<String, Object> userProfile = (Map<String, Object>) responseMap.get("response");

        KakaoProfile kakaoProfile = new KakaoProfile();

        // uuid 가져오기
        Object uuidobj = responseMap.get("id");
        if (uuidobj != null) {
            kakaoProfile.setId(String.valueOf(uuidobj));
        } else {
            return null;
        }

        // nickname 가져오기
        Map<String, Object> properties = (Map<String, Object>) responseMap.get("properties");
        if (properties != null) {
            String nickname = (String) properties.get("nickname");
            if (nickname != null) {
                kakaoProfile.setNickname(nickname);
            } else {
                return null;
            }
        } else {
            return null;
        }

        // email 가져오기
        Map<String, Object> kakaoAccount = (Map<String, Object>) responseMap.get("kakao_account");
        if (kakaoAccount != null) {
            String email = (String) kakaoAccount.get("email");
            if (email != null) {
                kakaoProfile.setEmail(email);
            } else {
                return null;
            }
        } else {
            return null;
        }


        System.out.println("KakaoProfile ID: " + kakaoProfile.getId());
        System.out.println("KakaoProfile Nickname: " + kakaoProfile.getNickname());
        System.out.println("KakaoProfile Email: " + kakaoProfile.getEmail());

//        kakaoProfile.setId((String) userProfile.get("id"));
//        kakaoProfile.setNickname((String) userProfile.get("nickname"));
//        kakaoProfile.setEmail((String) userProfile.get("email"));

        return kakaoProfile;
    }


}
