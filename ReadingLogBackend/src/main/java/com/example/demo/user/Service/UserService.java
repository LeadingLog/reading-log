package com.example.demo.user.Service;

//import com.example.demo.user.Member;
//import com.example.demo.repository.MemberRepository;

import com.example.demo.refreshToken.RefreshToken;
import com.example.demo.refreshToken.RefreshTokenRepository;
import com.example.demo.user.Entity.NaverProfile;
import com.example.demo.user.Entity.NaverTokenResponse;
import com.example.demo.user.Entity.User;
import com.example.demo.user.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Map;

@Service
public class UserService {

//    private final MemberRepository memberRepository;
//
//    public MemberService(MemberRepository memberRepository) {
//        this.memberRepository = memberRepository;
//    }

//    @Transactional
//    public Member addMember(Long userId, String userName) {
//        Member member = new Member();
//        member.setUserId(userId);
////        member.setUserName(userName);
//        return memberRepository.save(member);
//    }

    private final UserRepository userRepository;
    private final RefreshTokenRepository tokenRepository;
    private final ApiKeyService apiKey;

    public UserService(UserRepository userRepository, RefreshTokenRepository tokenRepository, ApiKeyService apiKey) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.apiKey = apiKey;
    }

    // 관리자 토큰 값 받아오기
//    public ArrayList<RefreshToken> getToken(String provider) {
//        RefreshToken refreshToken = new RefreshToken();
//        ArrayList<RefreshToken> list = tokenRepository.findByUserIdAndProvider(1, provider);
//        if (list.isEmpty()) return null;     // TODO 에러 처리 고민 필요
//        return list;
//    }

    // 1. callback 이후 접근 신규 토큰 발급 요청
    @Transactional
    public String getAccessToken(String code, String state, String platform) {
//        if (platform.equals("NAVER")) {
            String clientId = apiKey.getNaver_client_id();
            String clientSecret = apiKey.getNaver_client_secret();

//        String header = "Bearer" + token;
            try {
                StringBuilder apiURL = new StringBuilder();
                // TODO 경로에 Bearer 안붙여도 괜찮은지 확인
                apiURL.append("https://nid.naver.com/oauth2.0/token");
                apiURL.append("&client_id=").append(clientId);
                apiURL.append("&client_secret=").append(clientSecret);
                apiURL.append("grant_type=authorization_code");
                apiURL.append("&state=").append(state);
                apiURL.append("&code=").append(code);

//                URL url = new URL(apiURL);
//                HttpURLConnection con = (HttpURLConnection) url.openConnection();
//                con.setRequestMethod("GET");

//                HttpHeaders headers = new HttpHeaders(); // 기존 회원 로그인 시 필요
//                headers.set("Authorization", "Bearer " + accessToken);

                RestTemplate restTemplate = new RestTemplate();
                ResponseEntity<String> response = restTemplate.exchange(apiURL.toString(), HttpMethod.GET, null, String.class);
                // JSON 결과값 반환
                String responseBody = response.getBody();
                ObjectMapper objectMapper = new ObjectMapper();
                NaverTokenResponse naverTokenResponse = objectMapper.readValue(responseBody, NaverTokenResponse.class);
                // accessToken 반환
                if (naverTokenResponse.getError().isEmpty()) {
                    return naverTokenResponse.getAccessToken();
                }
                return naverTokenResponse.getError();   // error 발생 시 에러 반환


            } catch (IOException e) {
                throw new RuntimeException(e);
            }

//        }
    }

    // 접근 토큰으로 프로필 조회 요청
    public NaverProfile getUserInfo(String accessToken) throws URISyntaxException {
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

        NaverProfile naverProfile = new NaverProfile(response.getBody());
        return naverProfile;

    }


    // 회원 추가
    public String joinUser(NaverProfile userInfo) {
        User user = new User();
        user.setUserUUID(userInfo.getId());
        user.setNickname(userInfo.getNickname());
        user.setUserEmail(userInfo.getEmail());

        userRepository.save(user);

        return null;
    }

    // 회원 조회
    public ArrayList<User> getUser(String userUUID) {
        ArrayList<User> uuid = userRepository.getIdByUserUUID(userUUID);
        return uuid;
    }

    // 로그인 처리
    public String userLogin(String userUUID) {
        //
//        ArrayList<User> uuid = userRepository.getByUserUUID(userUUID);
        getUser(userUUID);

        return null;
    }


//    public void getUserProfile() {
//        String token = apiKey.getNaver_client_id();
//        String header = "Bearer" + token;
//        try {
//            String apiURL = "https://nid.naver.com/oauth2.0/token";
//            URL url = new URL(apiURL);
//            HttpURLConnection con = (HttpURLConnection) url.openConnection();
//            con.setRequestMethod("GET");
//            con.setRequestProperty("Authorization", header);
//            int responseCode = con.getResponseCode();
//            BufferedReader br;
//            if (responseCode == 200) {
//                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
//            } else {
//                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
//            }
//            String inputLine;
//            StringBuffer response = new StringBuffer();
//            while ((inputLine = br.readLine()) != null) {
//                response.append(inputLine);
//            }
//            br.close();
//            System.out.println(response.toString());
//
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }



}