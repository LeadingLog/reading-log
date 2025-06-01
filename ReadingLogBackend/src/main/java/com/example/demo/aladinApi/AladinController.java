package com.example.demo.aladinApi;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.demo.readingList.ReadingList;
import com.example.demo.readingList.ReadingListRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/books")
public class AladinController {

	private ReadingListRepository readingListRepository;

	@Value("${AlADIN_KEY}")
	private String ttbkey;

	@GetMapping("/search")
	public Map<String, Object> searchBooks(@RequestParam("userId") Integer userId, @RequestParam("query") String query,
			@RequestParam("start") int start) {

		Map<String, Object> responseMap = new HashMap<>();

		String cover = "Big";
		String searchTarget = "Book";
		String output = "js";
		String version = "20131101";

		String url = UriComponentsBuilder.fromHttpUrl("https://www.aladin.co.kr/ttb/api/ItemSearch.aspx")
				.queryParam("ttbkey", ttbkey).queryParam("Query", query).queryParam("MaxResults", 10)
				.queryParam("start", start).queryParam("Cover", "Big").queryParam("SearchTarget", "Book")
				.queryParam("output", "js").queryParam("Version", "20131101").build(false) // 인코딩 안하게 막기
				.toUriString();

		try {
			RestTemplate restTemplate = new RestTemplate();
			String jsonResponse = restTemplate.getForObject(url, String.class);

			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, Object> apiResult = objectMapper.readValue(jsonResponse, Map.class);

			List<Map<String, Object>> items = (List<Map<String, Object>>) apiResult.get("item");

			if (items != null) {
				for (Map<String, Object> item : items) { // 아이템 하나씩 요소를 돌면서 isbn13으로 비교해서 동일하면 넣어주기
					String isbn13 = (String) item.get("isbn13"); 
					Optional<ReadingList> hasReadingList = readingListRepository.findByUserIdAndIsbn13(userId, isbn13);

					if (hasReadingList.isPresent()) {
						ReadingList rl = hasReadingList.get();
						item.put("bookStatus", rl.getBookStatus().name());
						if (rl.getReadStartDt() != null)
							item.put("readStartDt", rl.getReadStartDt());
						if (rl.getReadEndDt() != null)
							item.put("readEndDt", rl.getReadEndDt());
					}

				}
			}

			responseMap.put("success", true);
			responseMap.put("data", apiResult);

		} catch (

		JsonProcessingException e) {
			responseMap.put("success", false);
			responseMap.put("errorMsg", "JSON parsing error: " + e.getMessage());
		} catch (Exception e) {
			responseMap.put("success", false);
			responseMap.put("errorMsg", e.getMessage());
		}

		return responseMap;
	}
}
