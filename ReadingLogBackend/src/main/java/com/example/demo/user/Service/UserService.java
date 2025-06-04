package com.example.demo.user.Service;

//import com.example.demo.user.Member;
//import com.example.demo.repository.MemberRepository;

import com.example.demo.response.ResponseService;
import com.example.demo.user.Entity.*;
import com.example.demo.user.Repository.RefreshTokenRepository;
import com.example.demo.user.Repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.dao.EmptyResultDataAccessException;
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
import java.util.*;

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
    public NaverTokenResponse getNewNaverAccessToken(String code, String state, String platform) {
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
            System.out.println("접근 토큰11 : " + response.getBody());
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


    // 회원 추가
    @Transactional
    public Integer joinUser(NaverProfile naverUserInfo, KakaoProfile kakaoUserInfo) {
        if (naverUserInfo == null && kakaoUserInfo == null) {
            throw new IllegalArgumentException("회원정보가 없습니다.");
        }

        User user = new User();

        if (naverUserInfo != null && kakaoUserInfo == null){
            System.out.println("네이버 회원 정보 처리");

            user.setUserUUID(naverUserInfo.getId());
            user.setNickname(naverUserInfo.getNickname());
            user.setUserEmail(naverUserInfo.getEmail());

        } else if (naverUserInfo == null && kakaoUserInfo != null) {
            System.out.println("카카오 회원 정보 처리");

            user.setUserUUID(kakaoUserInfo.getId());
            user.setNickname(kakaoUserInfo.getNickname());
            user.setUserEmail(kakaoUserInfo.getEmail());
        } else {
            throw new IllegalArgumentException("유저 두개 입력 오류.");
        }

        User joinedUser = userRepository.save(user);
        Integer userId = joinedUser.getUserId();

        return userId;
    }

    // 회원 조회 (userUUID)
    @Transactional
    public ArrayList<User> getUserByUUID(String userUUID) {
        ArrayList<User> uuid = userRepository.getIdByUserUUID(userUUID);
        return uuid;
    }

    // 회원 상세 조회 (userId)
    @Transactional
    public User findUserById(Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("findUserById id : " + user.getNickname());
            return user;
        } else {
            System.out.println("error " + userId);
            return null;
        }
    }

    // 회원 정보 수정 (userId) - 마이페이지 수정
    // TODO upd_date 도 업데이트
    @Transactional
    public User updateUser(User user) {
        User newuser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("user not found"));
        // 이메일 수정
        if (user.getUserEmail() != null) {
            newuser.setUserEmail(user.getUserEmail());
        }

        // 닉네임 수정
        if (user.getNickname() != null) {
            newuser.setNickname(user.getNickname());
        }
        return userRepository.save(newuser);
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
    @Transactional
    public void logoutUser(HttpServletRequest request) {
        // 로그인 세션 삭제
        HttpSession session = null;
        session = request.getSession();
//        session.removeAttribute("loginUserId");
        session.invalidate();

    }

    // 회원 탈퇴
    @Transactional
    public Map<String, Object> deleteUser(Integer userId, HttpServletRequest request) throws JsonProcessingException {

        // 갱신 토큰 조회
//        ArrayList<RefreshToken> refreshTokens = refreshTokenService.getToken(userId, "Naver");
        RefreshToken refreshToken = refreshTokenService.findByUserId(userId);
//        String token = String.valueOf(refreshTokens.get(0).getToken());
        String token = refreshToken.getToken();
        String provider = refreshToken.getProvider();

        Map<String, Object> result = new HashMap<>();

        if (provider.equals("Naver")) {
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

            if (naverDeleteResponse != null && "success".equals(naverDeleteResponse.getResult())) {
                result = deleteInternalUser(userId, request);
            } else {
                // 네이버 탈퇴 실패 처리
                result.put("status", "error");
                result.put("message", "네이버 연동 해제 실패");
            }
        } else if (provider.equals("Kakao")) {
            // 카카오 토큰 재발급, aminKey 를 이용하는 방식 선택하여 필요없음.
//            KakaoTokenResponse kakaoTokenResponse = refreshTokenService.getKakaoAccessTokenByRefreshToken(token);
//            String accessToken = kakaoTokenResponse.getAccessToken();

            String kakaoAdminKey = apiKey.getKakao_app_admin_key();
            String targetId = userRepository.getReferenceById(userId).getUserUUID();

            System.out.println(targetId);

            String kakaoTokenUrl = "https://kapi.kakao.com/v1/user/unlink";

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "KakaoAK " + kakaoAdminKey);
            headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("target_id_type", "user_id"); // 발급
            params.add("target_id", targetId);

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

            RestTemplate restTemplate = new RestTemplate();
            // TODO 경로 requestentity 로 옮겨주기
            ResponseEntity<String> response = restTemplate
                    .exchange(kakaoTokenUrl, HttpMethod.POST, kakaoTokenRequest, String.class);
            // JSON 결과값 반환
            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);
            JsonNode idNode = rootNode.get("id");

            String userIdFromKakao = null;
            if (idNode != null) {
                userIdFromKakao = idNode.asText(); // 값을 String으로 변환해서 가져옴!
            }

            if (userIdFromKakao != null) {
                result = deleteInternalUser(userId, request);
            } else {
                // 카카오 탈퇴 실패 처리
                result.put("status", "error");
                result.put("message", "카카오 연동 해제 실패");
            }

            System.out.println("접근 토큰22 by refreshToken : " + response.getBody());
            System.out.println("kakaoTokenResponse : " + userIdFromKakao);

            deleteInternalUser(userId, request);

        } else {
            // 지원하지 않는 Provider
            result.put("status", "error");
            result.put("message", "지원하지 않는 Provider입니다.");
        }
        return result;
    }


    // 내부 회원 탈퇴
    public Map<String,Object> deleteInternalUser(Integer userId, HttpServletRequest request) {

        try {
            // 회원 삭제
            userRepository.deleteById(userId);

            // todo 갱신토큰 삭제
            refreshTokenService.deleteToken(userId, "Naver");

            // Todo 탈퇴 성공 시
            // 로그인 세션 삭제
            HttpSession session = request.getSession();
            if (session != null) {
                session.removeAttribute("loginUserId");
            }

            // 성공 응답 데이터 맵 생성
            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("status", "success"); // 성공 상태 표시
            successResponse.put("message", "회원 탈퇴 성공");
            successResponse.put("userId", userId); // 탈퇴한 유저 ID 등 필요한 정보 추가

            return successResponse; // 성공 데이터 맵 반환

        } catch (EmptyResultDataAccessException e) {
            // 삭제할 유저가 없는 경우 처리
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "해당 유저를 찾을 수 없어 탈퇴 처리에 실패했습니다.");
            return errorResponse;

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "내부 회원 삭제 중 오류 발생");
            return errorResponse;
        }
    }


    // todo 네이버 로그인 연결 끊기 알림 api 명세
    // https://developers.naver.com/docs/login/devguide/devguide.md#5-4-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%97%B0%EA%B2%B0-%EB%81%8A%EA%B8%B0-%EC%95%8C%EB%A6%BC-%EB%B0%9B%EA%B8%B0



    // 회원 세션 남은 시간 조회
    @Transactional
    public Map<String, Object> getUserSession(HttpServletRequest request) {
        HttpSession session = null;
        session = request.getSession();
        Map<String, Object> rtn = new HashMap<>();
        rtn.put("sessionLoginUserId", (Integer) session.getAttribute("loginUserId"));
        rtn.put("sessionLoginValidTime", (Integer) session.getAttribute("loginSessionValidTime"));

        return rtn;
    }


    //  로그인 세션 연장
    /*
     - 사용자가 요청을 할때마다 세션의 비활성 시간이 초기화되어 자동 연장됨.
     - 설정한 GETMAXintervaltime 으로 연장됨
     */
    @Transactional
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

    // 회원 정보 수정 (userId)




}