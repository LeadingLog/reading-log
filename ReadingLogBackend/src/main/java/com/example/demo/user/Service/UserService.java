package com.example.demo.user.Service;

//import com.example.demo.user.Member;
//import com.example.demo.repository.MemberRepository;

import com.example.demo.response.ResponseService;
import com.example.demo.user.Entity.RefreshToken;
import com.example.demo.user.Repository.RefreshTokenRepository;
import com.example.demo.user.Entity.NaverProfile;
import com.example.demo.user.Entity.NaverTokenResponse;
import com.example.demo.user.Entity.User;
import com.example.demo.user.Repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
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
    private final RefreshTokenService refreshTokenService;
    private final ResponseService responseService;

    public UserService(UserRepository userRepository, RefreshTokenRepository tokenRepository, ApiKeyService apiKey, RefreshTokenService refreshTokenService, ResponseService responseService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.apiKey = apiKey;
        this.refreshTokenService = refreshTokenService;
        this.responseService = responseService;
    }

    // 1. callback 이후 접근 신규 토큰 발급 요청
    @Transactional
    public NaverTokenResponse getNewAccessToken(String code, String state, String platform) {
        Map<String, Object> result = new HashMap<>();

//        if (platform.equals("NAVER")) {
        String clientId = apiKey.getNaver_client_id();
        String clientSecret = apiKey.getNaver_client_secret();

//        String header = "Bearer" + token;
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
            System.out.println("접근 토큰 : " + response.getBody());
            System.out.println("naverTokenResponse : "+ naverTokenResponse);



            // accessToken 반환
//            if (responseBody.isEmpty()) {
//                result.put("error", naverTokenResponse.getError());
//                result.put("error_description", naverTokenResponse.getErrorDescription());
//                return result;   // error 발생 시 에러 반환
//            }
//            result.put("access_token", naverTokenResponse.getAccessToken());
//            result.put("refresh_token", naverTokenResponse.getRefreshToken());
//            result.put("token_type", naverTokenResponse.getTokenType());
//            result.put("expires_in", naverTokenResponse.getExpiresIn());
            return naverTokenResponse;

            // TODO 요청 실패 시 처리 필요

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

//        }
    }

    // 접근 토큰으로 프로필 조회 요청
    public NaverProfile getUserInfo(String accessToken) throws URISyntaxException, JsonProcessingException {
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


    // 회원 추가
    @Transactional
    public Integer joinUser(NaverProfile userInfo) {
        if (userInfo == null) {
            throw new IllegalArgumentException("회원정보가 없습니다.");
        }
        System.out.println(userInfo);
        System.out.println(userInfo.getId());

        User user = new User();
        user.setUserUUID(userInfo.getId());
        user.setNickname(userInfo.getNickname());
        user.setUserEmail(userInfo.getEmail());

        User joinedUser = userRepository.save(user);
        Integer userId = joinedUser.getUserId();

        return userId;
    }

    // 회원 조회
    @Transactional
    public ArrayList<User> getUserByUUID(String userUUID) {
        ArrayList<User> uuid = userRepository.getIdByUserUUID(userUUID);
        return uuid;
    }

    public User getUserById(Integer userId) {
        User user = userRepository.getReferenceById(userId);
        return user;
    }

    // 회원 로그인
    @Transactional
    public Integer loginUser(String userUUID, HttpServletRequest request) {
        HttpSession session = null;

        // 회원 여부 조회
//        ArrayList<User> uuid = userRepository.getIdByUserUUID(userUUID);
        ArrayList<User> uuid = getUserByUUID(userUUID);
        Integer userId = uuid.get(0).getUserId();
//        String token = String.valueOf(tokenRepository.findByUserIdAndProvider(userId, "NAVER"));

        if (uuid.size() == 1) { // 회원일 경우
            extendSession(userId, request);

//            session = request.getSession();
//            session.setMaxInactiveInterval(604800); // 7일
//            session.setAttribute("loginUserId", userId);
//            session.setAttribute("loginSessionValidTime", session.getMaxInactiveInterval());
        } else {
            return 0;
        }

        return userId;
    }


    // 회원 로그아웃
    public void logoutUser(HttpServletRequest request) {
        // 로그인 세션 삭제
        HttpSession session = null;
        session = request.getSession();
//        session.removeAttribute("loginUserId");
        session.invalidate();

    }

    // 네이버 회원 탈퇴
    public void deleteUser(Integer userId, HttpServletRequest request) throws JsonProcessingException {

        // 갱신 토큰 조회
        ArrayList<RefreshToken> refreshTokens = refreshTokenService.getToken(userId, "Naver");
        String token = String.valueOf(refreshTokens.get(0).getToken());

        // 토큰 재발급
        NaverTokenResponse naverTokenResponse = refreshTokenService.getAccessTokenByRefreshToken(token);
        String accessToken = naverTokenResponse.getAccessToken();

        // 접근토큰으로 네이버 회원탈퇴
        String clientId = apiKey.getNaver_client_id();
        String clientSecret = apiKey.getNaver_client_secret();

//        try {
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
//        System.out.println(naver);

//            return null;

//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }


        // Todo 네이버 탈퇴 성공 시
        // 로그인 세션 삭제
        HttpSession session = null;
        session = request.getSession();
        session.removeAttribute("loginUserId");

        // 회원 삭제
        userRepository.deleteById(userId);

        // todo 갱신토큰 삭제


    }

    // todo 네이버 로그인 연결 끊기 알림 api 명세
    // https://developers.naver.com/docs/login/devguide/devguide.md#5-4-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%97%B0%EA%B2%B0-%EB%81%8A%EA%B8%B0-%EC%95%8C%EB%A6%BC-%EB%B0%9B%EA%B8%B0



    // 회원 세션 남은 시간 조회
    public Map<String, Object> getUserSession(HttpServletRequest request) {
        HttpSession session = null;
        session = request.getSession();
        Map<String, Object> rtn = null;
        rtn.put("sessionLoginUserId", (Integer) session.getAttribute("loginUserId"));
        rtn.put("sessionLoginValidTime", (Integer) session.getAttribute("loginSessionValidTime"));

        return rtn;
    }


    //  로그인 세션 연장
    /*
     - 사용자가 요청을 할때마다 세션의 비활성 시간이 초기화되어 자동 연장됨.
     - 설정한 GETMAXintervaltime 으로 연장됨
     */
    public ResponseEntity<Map<String,Object>> extendSession(Integer userId, HttpServletRequest request) {
        try {
            HttpSession session = request.getSession();
            session.setMaxInactiveInterval(604800); // 7일
            session.setAttribute("loginUserId", userId);
            session.setAttribute("loginSessionValidTime", session.getMaxInactiveInterval());
            return responseService.responseData(true, null);
        } catch (Exception e) {
            return responseService.responseData(false, "extend session failed");
        }

    }




}