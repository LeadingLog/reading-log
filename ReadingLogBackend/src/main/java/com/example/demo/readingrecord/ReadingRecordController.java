package com.example.demo.readingrecord;

import java.time.LocalDate;


import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/readingrecord")
public class ReadingRecordController {

    private final ReadingRecordService readingRecordService;

    public ReadingRecordController(ReadingRecordService readingRecordService) {
        this.readingRecordService = readingRecordService;
    }
    
  //시간 추가하기 	
	@PostMapping("/add")
	public ResponseEntity<Map<String, Object>> addRecord(@RequestBody ReadingRecord readingRecord) {
		 Map<String, Object> response = new HashMap<>();
	    try {
	    	readingRecordService.addRecord(
	    		    readingRecord.getBookId(),
	    		    readingRecord.getUserId(),
	    		    readingRecord.getReadDate(),
	    		    readingRecord.getTotalTime(),
	    		    readingRecord.getStartTime(),
	    		    readingRecord.getEndTime()
	    		);
	    	 response.put("success", true);
	    	 return ResponseEntity.ok(response);
	    	 } catch (Exception e) {
	    		 response.put("success", false);
	             response.put("message", "조회 실패: " + e.getMessage());
	             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

   
    // 연간 월별 독서 시간 조회
    @GetMapping("/stats/time/yylist")
    public ResponseEntity<Map<String, Object>> getAnnualMontlyReadingTime(
            @RequestParam("userId") Integer userId, @RequestParam("year") Integer year) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Map<String, Integer>> data = readingRecordService.getMonthlyTotalTimeByUserAndYear(userId, year);
            response.put("success", true);
            response.put("data", data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 총 읽은 시간 조회
    @GetMapping("/stats/time")
    public ResponseEntity<Map<String, Object>> getTotalReadingTime(@RequestParam("userId") Integer userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            Integer totalTime = readingRecordService.getTotalReadingTimeByUserId(userId);
            response.put("success", true);
            response.put("data", totalTime);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "총 시간 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 연간 총 읽은 시간 조회
    @GetMapping("/stats/time/yy")
    public ResponseEntity<Map<String, Object>> getAnnualReadingTime(
            @RequestParam("userId") Integer userId, @RequestParam("year") Integer year) {
        Map<String, Object> response = new HashMap<>();
        try {
            Integer totalTime = readingRecordService.getTotalReadingTimeByUserIdAndYear(userId, year);
            response.put("success", true);
            response.put("data", totalTime);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "연간 총 시간 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 연간 > 월별 > 책 > 읽은 시간 (시간 중심)
    @GetMapping("/stats/time/book_id")
    public ResponseEntity<Map<String, Object>> getReadingTimeOrderTime(@RequestParam("userId") Integer userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Map<String, Object>> data = readingRecordService.getTimeYearMonthBookStats(userId);
            response.put("success", true);
            response.put("data", data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "시간 기반 통계 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 연간 > 월별 > 책 > 읽은 시간 (책 중심)
    @GetMapping("/stats/book/book_id")
    public ResponseEntity<Map<String, Object>> getReadingTimeOrderBook(@RequestParam("userId") Integer userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Map<String, Object>> data = readingRecordService.getBookTimeByYearMonth(userId);
            response.put("success", true);
            response.put("data", data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "책 중심 통계 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 특정 연도 & 월의 책별 독서 시간 조회
    @GetMapping("/stats/time/yymm/book_id")
    public ResponseEntity<Map<String, Object>> getReadingTimeBookIdWithYymm(
            @RequestParam("userId") Integer userId,
            @RequestParam("year") Integer year,
            @RequestParam("month") Integer month) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Map<String, Object>> data = readingRecordService.getYearMonthBookStats(userId, year, month);
            response.put("success", true);
            response.put("data", data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "연월 기준 통계 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}


