package com.example.demo.aladinApi;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/books")
public class AladinController {

	@Value("${AlADIN_KEY}")
	private String ttbkey;

    @GetMapping("/search")
    public Map<String, Object> searchBooks(@RequestParam String query, @RequestParam int start) {
        Map<String, Object> responseMap = new HashMap<>();

        int maxResults = 10;
        String cover = "Big";
        String searchTarget = "Book";
        String output = "js";
        String version = "20131101";

        String url = UriComponentsBuilder.fromHttpUrl("https://www.aladin.co.kr/ttb/api/ItemSearch.aspx")
                .queryParam("ttbkey", ttbkey)
                .queryParam("Query", query)
                .queryParam("MaxResults", maxResults)
                .queryParam("start", start)
                .queryParam("Cover", cover)
                .queryParam("SearchTarget", searchTarget)
                .queryParam("output", output)
                .queryParam("Version", version)
                .toUriString();

        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> apiResponse = restTemplate.exchange(url, HttpMethod.GET, null, String.class);

            responseMap.put("success", true);
            responseMap.put("data", apiResponse.getBody());
            
            System.out.println("알라딘 API 응답: " + apiResponse.getBody());

        } catch (RestClientException e) {
            responseMap.put("success", false);
            responseMap.put("errorMsg", e.getMessage());
            
            System.out.println("알라딘 API 오류: " + e.getMessage());
            
        }

        // 응답 데이터 리턴
        return responseMap;
    }
}

