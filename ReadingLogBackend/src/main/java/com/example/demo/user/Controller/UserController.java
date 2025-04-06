package com.example.demo.user.Controller;

//import com.example.demo.user.Member;
//import com.example.demo.service.MemberService;

import com.example.demo.refreshToken.RefreshToken;
import com.example.demo.user.Entity.NaverProfile;
import com.example.demo.user.Entity.User;
import com.example.demo.user.Service.ApiKeyService;
import com.example.demo.user.Service.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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
    private final ApiKeyService apiKey;

    public UserController(UserService userService, ApiKeyService apiKey) {
        this.userService = userService;
        this.apiKey = apiKey;
    }

    // 관리자 토큰 값 받아오기
//    @GetMapping("/getToken")
//    public ArrayList<RefreshToken> getToken(String provider) {
//        return userService.getToken(provider);
//    }


    // login 시 인증 키 값
//    @GetMapping("/login")
//    public Model login(Model model) {
//        ArrayList<RefreshToken> naverTokens = userService.getToken("NAVER");
//        ArrayList<RefreshToken> kakaoTokens = userService.getToken("KAKAO");
//        List<Map<String, Object>> map = new ArrayList<>();
//
//        // 네이버 각 항목 token 값 확인
//        for (RefreshToken token : naverTokens) {
//            if (token.getInfo().equals("CLIENT_ID"))
//                model.addAttribute("NaverClientId", token.getToken());
//            if (token.getInfo().equals("CLIENT_SECRET"))
//                model.addAttribute("NaverClientSecret", token.getToken());
//            if (token.getInfo().equals("REDIRECT_URI"))
//                model.addAttribute("NaverRedirectUri", token.getToken());
//        }
//
//        // 카카오 각 항목 token 값 확인
//        for (RefreshToken token : kakaoTokens) {
//            if (token.getInfo().equals("API_KEY"))
//                model.addAttribute("KakaoApiKey", token.getToken());
//            if (token.getInfo().equals("REDIRECT_URI"))
//                model.addAttribute("KakaoRedirectUri", token.getToken());
//        }
//        return model; // 각 key 값 login 페이지로 전달
//        // TODO 에러 처리 필요
//    }

    // api key 값 로그인 페이지에 전달
//    @GetMapping("/login")
//    public String loginForm(Model model) {
//        model.addAttribute("naverclientid", apiKey.getNaver_client_id());
//        model.addAttribute("naverClientSecret", apiKey.getNaver_client_secret());
//        model.addAttribute("naverRedirectUri", apiKey.getNaver_redirect_uri());
//        model.addAttribute("kakaoApiKey", apiKey.getKakao_api_key());
//        model.addAttribute("kakaoRedirectUri", apiKey.getKakao_redirect_uri());
//        return "login";
//    }


    // callback 이후 접근 토큰 발급 요청
    @ResponseBody
    @GetMapping("/naverlogin")
    public String naverLogin(String code, String state) throws IOException, URISyntaxException {
        String msg;

        // 1. 접근 토큰 요청
        String accessToken = userService.getAccessToken(code, state, "NAVER");
        System.out.println("accessToken="+accessToken);

        // 2. 네이버 프로필 정보 조회
        NaverProfile userInfo = userService.getUserInfo(accessToken);

        // 3. 사이트 가입 여부 조회 (미가입 : 회원가입/ 가입 : 로그인)
        String naverId = userInfo.getId();
        ArrayList<User> uuid = userService.getUser(naverId);

        if (uuid.isEmpty()) {
            // 회원 가입
            userService.joinUser(userInfo);
            msg = "회원가입 성공";
        } else if (uuid.size() == 1) {
            // TODO 로그인 처리
            userService.userLogin(naverId);

            msg = "로그인 성공";
        } else {
            msg = "오류: [ " + uuid.size() + " ] 개의 아이디가 조회됩니다.";
        }



        return msg;
    }




}