package com.example.demo.user.Controller;

//import com.example.demo.user.Member;
//import com.example.demo.service.MemberService;

import com.example.demo.user.Entity.NaverProfile;
import com.example.demo.user.Entity.NaverTokenResponse;
import com.example.demo.user.Entity.RefreshToken;
import com.example.demo.user.Entity.User;
import com.example.demo.user.Service.ApiKeyService;
import com.example.demo.user.Service.RefreshTokenService;
import com.example.demo.user.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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

    public UserController(UserService userService, ApiKeyService apiKey, RefreshTokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    // TODO 회원 세션 시간 조회
    @GetMapping("/getUserSession")
    public Integer getUserSession(HttpServletRequest request) {
        return userService.getUserSession(request);
    }

    // TODO 회원 세션 시간 연장


    // 네이버 회원가입 및 로그인
    // callback 이후 접근 토큰 발급 요청 TODO return 값 users
    @ResponseBody
    @PostMapping("/naverlogin")
    public Map<String,Object> naverLogin(String code, String state, HttpServletRequest request) throws IOException, URISyntaxException {
        Map<String,Object> rtn = null;

        // TODO 요청 실패 시 처리 필요


        // 1. 접근 토큰 신규 발급
        NaverTokenResponse accessTokenResult = userService.getNewAccessToken(code, state, "NAVER");
        System.out.println("accessToken="+accessTokenResult);

        // 접근 토큰 에러 시 리턴
        if (accessTokenResult.getError() != null) {
            rtn.put("error", "accessToken Error");
        }

        // accessToken 만료 시 재발급
        int expires_in = Integer.parseInt(accessTokenResult.getExpiresIn());
        if ( expires_in <= 0) {
            accessTokenResult = tokenService.getAccessTokenByRefreshToken();
        }


        // 2. 네이버 프로필 정보 조회
        String accessToken = accessTokenResult.getAccessToken();
        NaverProfile userInfo = userService.getUserInfo(accessToken);

        // 3. 사이트 가입 여부 조회 (미가입 : 회원가입/ 가입 : 로그인)
        String naverId = userInfo.getId();
        ArrayList<User> uuid = userService.getUser(naverId);

        if (uuid.isEmpty()) {   // 회원 가입
            // 회원 추가
            Integer userId = userService.joinUser(userInfo);
            // 갱신 토큰 저장
            RefreshToken refreshToken = new RefreshToken(null, userId, "Naver", accessTokenResult.getRefreshToken());
            RefreshToken result = tokenService.addToken(refreshToken);

            // 토큰 저장 불가 에러 발생 시 회원 삭제
            if (result == null) {
                userService.deleteUser(userId, request);
                rtn.put("error", "회원가입 중 토큰 저장 에러 발생. 재가입 필요");
            }
            rtn.put("success", "회원가입 성공");

        } else if (uuid.size() == 1) {  // 로그인
            // 로그인 처리
            Integer loginId = userService.loginUser(naverId, request);
            rtn.put("loginId", loginId);
            rtn.put("success", "로그인 성공");

        } else {
            rtn.put("error", "오류: [ " + uuid.size() + " ] 개의 아이디가 조회됩니다.");
        }
        return rtn;
        // TODO session 유효시간
    }

    // 카카오 회원가입 및 로그인




    // 로그아웃
    @PostMapping("/logout")
    public void logoutUser(HttpServletRequest request) {
        userService.logoutUser(request);
    }


    // 회원 탈퇴
    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam("userId") Integer userId, HttpServletRequest request) {
        // Todo 토큰으로 네이버 로그인 연동 해제하기
        userService.deleteUser(userId, request);
    }



}