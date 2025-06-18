package com.example.demo.user.Controller;

//import com.example.demo.user.Member;
//import com.example.demo.service.MemberService;

import com.example.demo.code.Provider;
import com.example.demo.response.ResponseService;
import com.example.demo.user.Entity.*;
import com.example.demo.user.Service.ApiKeyService;
import com.example.demo.user.Service.KakaoService;
import com.example.demo.user.Service.RefreshTokenService;
import com.example.demo.user.Service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.*;
import java.util.*;


@RestController
@RequestMapping("/user")
public class UserController {

//    private final MemberService memberService;

//    public MemberController(MemberService memberService) {
//        this.memberService = memberService;
//    }
//
//    @PostMapping("/add")
//    public Member addMember(@RequestParam("userId") String userId,
//                            @RequestParam("userName") String userName) {
//        return memberService.addMember(userId, userName);
//    }

    private final UserService userService;
    private final RefreshTokenService tokenService;
    private final ResponseService responseService;
    private final KakaoService kakaoService;

    public UserController(UserService userService, ApiKeyService apiKey, RefreshTokenService tokenService, ResponseService responseService, KakaoService kakaoService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.responseService = responseService;
        this.kakaoService = kakaoService;
    }

    // 회원 세션 시간 조회
    @GetMapping("/getUserSession")
    public Map<String, Object> getUserSession(HttpServletRequest request) {
        return userService.getUserSession(request);
    }


    // 회원 세션 유지용 컨트롤러
    @GetMapping("/extend_session")
    public ResponseEntity<Map<String,Object>> extendSession(HttpServletRequest request, Integer userId) {
        try {
            // 테스트용
            // @RequestParam(required = false) Boolean fail
//            if (fail != null && fail) {
//                return responseService.responseData(false, "extend session failed");
//            }

            return userService.extendSession(userId, request);
        } catch (Exception e) {
            return responseService.responseData(false, "extend session failed");
        }
    }



    // 로그아웃
    @PostMapping("/logout")
    public void logoutUser(HttpServletRequest request) {
        userService.logoutUser(request);
    }


    // 회원 탈퇴
    @DeleteMapping("/{userId}/delete")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable("userId") Integer userId, HttpServletRequest request) throws JsonProcessingException {
        Map<String, Object> serviceResult;
        Map<String, Object> finalResult = new HashMap<>();
        HttpStatus httpStatus;

        try {
            serviceResult = userService.deleteUser(userId, request);

            if ("success".equals(serviceResult.get("status"))) {
                httpStatus = HttpStatus.OK;
                finalResult.put("success", true);
            } else {
                finalResult.put("success", false);
                finalResult.put("message", serviceResult.get("message"));
                httpStatus = HttpStatus.BAD_REQUEST;
            }
        }catch (JsonProcessingException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            finalResult.put("success", false);
            finalResult.put("message", "회원 탈퇴 처리 중 데이터 형식 오류 발생");
//            errorResponse.put("status", "error");
//            errorResponse.put("message", "회원 탈퇴 처리 중 데이터 형식 오류 발생");

            finalResult = errorResponse;
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;


        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "회원 탈퇴 중 예상치 못한 오류가 발생했습니다.");

            finalResult = errorResponse;
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(finalResult, httpStatus);
    }



    // 회원 상세 조회 (userId) - 마이페이지 조회
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> findUserById(@PathVariable("userId") Integer userId) {
        Map<String, Object> rtn = new HashMap<>();
        User user = userService.findUserById(userId);
        Provider socialInfo = tokenService.findProviderByUserId(userId);
        if (!user.getNickname().isEmpty()) {
            rtn.put("success", true);
            rtn.put("user", user);
            rtn.put("provider", socialInfo);
            return ResponseEntity.ok().body(rtn);
        } else {
            rtn.put("success", false);
            return ResponseEntity.badRequest().body(rtn);
        }

    }



    // 회원 정보 수정 (userId) - 마이페이지 수정
    @PostMapping("/{userId}/modified")
    public ResponseEntity<Map<String, Object>> updateUser (@PathVariable Integer userId, User user) {
        Map<String, Object> rtn = new HashMap<>();
        if (userId != user.getUserId()) {
            rtn.put("success", false);
            return ResponseEntity.badRequest().body(rtn);
        }

        User savedUser = userService.updateUser(user);

        if (savedUser == null) {
            rtn.put("success", false);
            return ResponseEntity.badRequest().body(rtn);
        }

        rtn.put("success", true);
        rtn.put("user", savedUser);

        return ResponseEntity.ok().body(rtn);
    }








    // 네이버 회원가입 및 로그인
    // callback 이후 접근 토큰 발급 요청
    @ResponseBody
    @PostMapping("/naverlogin")
    public ResponseEntity<?> naverLogin(String code, String state, HttpServletRequest request) throws IOException, URISyntaxException {
        User users = null;
        Map<String, Object> rtn = new HashMap<>();

        // 1. 접근 토큰 신규 발급
        NaverTokenResponse accessTokenResult = userService.getNewNaverAccessToken(code, state);
        System.out.println("accessToken="+accessTokenResult);

        // 접근 토큰 에러 시 리턴
        if (accessTokenResult.getError() != null) {
            rtn.put("success", false);
            rtn.put("status", HttpStatus.NOT_ACCEPTABLE);
            rtn.put("error", accessTokenResult.getError());
            rtn.put("error_description", accessTokenResult.getErrorDescription());

            return ResponseEntity.badRequest().body(rtn);
        }

        // accessToken 만료 시 재발급
//        int expires_in = Integer.parseInt(accessTokenResult.getExpiresIn());
//        if ( expires_in <= 0) {
//            accessTokenResult = tokenService.getAccessTokenByRefreshToken(String );
//        }


        // 2. 네이버 프로필 정보 조회
        String accessToken = accessTokenResult.getAccessToken();
        NaverProfile naverUserInfo = userService.getNaverUserInfo(accessToken);

        // 3. 사이트 가입 여부 조회 (미가입 : 회원가입/ 가입 : 로그인)
        String naverId = naverUserInfo.getId();
        ArrayList<User> uuid = userService.getUserByUUID(naverId);

        if (uuid.isEmpty()) {   // 회원 가입
            // 회원 추가
            Integer userId = userService.joinUser(naverUserInfo, null);
            // 갱신 토큰 저장
            RefreshToken refreshToken = new RefreshToken(null, userId, Provider.NAVER, accessTokenResult.getRefreshToken());
            RefreshToken result = tokenService.addToken(refreshToken);

            // 토큰 저장 불가 에러 발생 시 회원 삭제
            if (result == null) {
                userService.deleteUser(userId, request);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 중 토큰 저장 에러 발생. 재가입 필요");
            }
            // 회원가입한 회원 조회
            users = userService.findUserById(userId);
            return new ResponseEntity<>(users, HttpStatus.OK);


        } else if (uuid.size() == 1) {  // 로그인
            // 로그인 처리
            Integer loginId = userService.loginUser(naverId, request);
            users = userService.findUserById(loginId);

            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }




    @ResponseBody
    @PostMapping("/kakaologin")
    // 카카오 회원가입 및 로그인
    public ResponseEntity<?> kakaoLogin(String code, HttpServletRequest request) throws IOException, URISyntaxException {
        User users = null;
        Map<String, Object> rtn = new HashMap<>();

        // 1. 토큰 받기
        KakaoTokenResponse accessTokenResult = kakaoService.getNewKakaoAccessToken(code);

        // 토큰 유효성 검증
        
        
        // 카카오 프로필 정보 조회
        String accessToken = accessTokenResult.getAccessToken();
        KakaoProfile kakaoUserInfo = kakaoService.getKakaoUserInfo(accessToken);

        // 오류 체크
        if (kakaoUserInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원 정보 연동 오류.");
        }

        // 사이트 가입 여부 조회
        String kakaoId = kakaoUserInfo.getId();
        ArrayList<User> uuid = userService.getUserByUUID(kakaoId);

        // 회원가입
        if (uuid.isEmpty()) {
            // 회원 추가
            Integer userId = userService.joinUser(null, kakaoUserInfo);
            // 갱신 토큰 저장
            RefreshToken refreshToken = new RefreshToken(null, userId, Provider.KAKAO, accessTokenResult.getRefreshToken());
            RefreshToken result = tokenService.addToken(refreshToken);

            if (result == null) {
                userService.deleteUser(userId, request);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 중 토큰 저장 에러 발생. 재가입 필요");
            }

            users = userService.findUserById(userId);
            return new ResponseEntity<>(users, HttpStatus.OK);

        } else if (uuid.size() == 1) {  // 로그인
            Integer loginId = userService.loginUser(kakaoId, request);
            users = userService.findUserById(loginId);

            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }


















}