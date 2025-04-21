package com.example.demo.user.Controller;

//import com.example.demo.user.Member;
//import com.example.demo.service.MemberService;

import com.example.demo.response.ResponseService;
import com.example.demo.user.Entity.NaverProfile;
import com.example.demo.user.Entity.NaverTokenResponse;
import com.example.demo.user.Entity.RefreshToken;
import com.example.demo.user.Entity.User;
import com.example.demo.user.Service.ApiKeyService;
import com.example.demo.user.Service.RefreshTokenService;
import com.example.demo.user.Service.UserService;
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

    public UserController(UserService userService, ApiKeyService apiKey, RefreshTokenService tokenService, ResponseService responseService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.responseService = responseService;
    }

    // 회원 세션 시간 조회
    @GetMapping("/getUserSession")
    public Map<String, Object> getUserSession(HttpServletRequest request) {
        return userService.getUserSession(request);
    }

    // TODO 회원 세션 시간 연장


    // 네이버 회원가입 및 로그인
    // callback 이후 접근 토큰 발급 요청 
    @ResponseBody
    @PostMapping("/naverlogin")
    public ResponseEntity<?> naverLogin(String code, String state, HttpServletRequest request) throws IOException, URISyntaxException {
        User users = null;

        // TODO 요청 실패 시 처리 필요


        // 1. 접근 토큰 신규 발급
        NaverTokenResponse accessTokenResult = userService.getNewAccessToken(code, state, "NAVER");
        System.out.println("accessToken="+accessTokenResult);

        // 접근 토큰 에러 시 리턴
        if (accessTokenResult.getError() != null) {
//            rtn.put("error", "accessToken Error");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
        ArrayList<User> uuid = userService.getUserByUUID(naverId);

        if (uuid.isEmpty()) {   // 회원 가입
            // 회원 추가
            Integer userId = userService.joinUser(userInfo);
            // 갱신 토큰 저장
            RefreshToken refreshToken = new RefreshToken(null, userId, "Naver", accessTokenResult.getRefreshToken());
            RefreshToken result = tokenService.addToken(refreshToken);

            // 토큰 저장 불가 에러 발생 시 회원 삭제
            if (result == null) {
                userService.deleteUser(userId, request);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 중 토큰 저장 에러 발생. 재가입 필요");
//                rtn.put("error", "회원가입 중 토큰 저장 에러 발생. 재가입 필요");
            }
//            rtn.put("success", "회원가입 성공");
            // 회원가입한 회원 조회
            users = userService.getUserById(userId);
            return new ResponseEntity<>(users, HttpStatus.OK);


        } else if (uuid.size() == 1) {  // 로그인
            // 로그인 처리
            Integer loginId = userService.loginUser(naverId, request);
            users = userService.getUserById(loginId);
            return new ResponseEntity<>(users, HttpStatus.OK);

//            rtn.put("loginId", loginId);
//            rtn.put("success", "로그인 성공");

        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            rtn.put("error", "오류: [ " + uuid.size() + " ] 개의 아이디가 조회됩니다.");
        }
//        return rtn;
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

    // 세션 유지용 컨트롤러
    @GetMapping("/extend_session")
    public ResponseEntity<Map<String,Object>> extendSession() {
        try {
            // 테스트용
            // @RequestParam(required = false) Boolean fail
//            if (fail != null && fail) {
//                return responseService.responseData(false, "extend session failed");
//            }
            return responseService.responseData(true, null);
        } catch (Exception e) {
            return responseService.responseData(false, "extend session failed");
        }
    }



}