package com.example.demo.aladinApi;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/books")
public class AladinController {

	@Value("${AlADIN_KEY}")
	private String ttbkey;

       @GetMapping("/search")
    public Map<String, Object> searchBooks(@RequestParam("query") String query, @RequestParam("start") int start) {
    	
    	
        Map<String, Object> responseMap = new HashMap<>();

        String cover = "Big";
        String searchTarget = "Book";
        String output = "js";
        String version = "20131101";

        String url = UriComponentsBuilder.fromHttpUrl("https://www.aladin.co.kr/ttb/api/ItemSearch.aspx")
                .queryParam("ttbkey", ttbkey)
                .queryParam("Query", query)  
                .queryParam("MaxResults", 10)
                .queryParam("start", start)
                .queryParam("Cover", "Big")
                .queryParam("SearchTarget", "Book")
                .queryParam("output", "js")
                .queryParam("Version", "20131101")
                .build(false) // 인코딩 안하게 막기 
                .toUriString();


        try {
        	 RestTemplate restTemplate = new RestTemplate();
             String jsonResponse = restTemplate.getForObject(url, String.class);

             ObjectMapper objectMapper = new ObjectMapper();

             Map<String, Object> apiResult = objectMapper.readValue(jsonResponse, Map.class);

             responseMap.put("success", true);
             responseMap.put("data", apiResult);

         } catch (JsonProcessingException e) {
             responseMap.put("success", false);
             responseMap.put("errorMsg", "JSON parsing error: " + e.getMessage());
         } catch (Exception e) {
             responseMap.put("success", false);
             responseMap.put("errorMsg", e.getMessage());
         }

         return responseMap;
     }
}

