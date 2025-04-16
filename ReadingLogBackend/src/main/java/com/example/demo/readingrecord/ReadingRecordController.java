package com.example.demo.readingrecord;

import java.time.LocalDate;
import java.time.LocalTime;
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
	
	public ReadingRecordController(ReadingRecordService  readingRecordService) {
		this.readingRecordService = readingRecordService; 
	}
	
	//시간 추가하기 	
	@PostMapping("/add")
	public ResponseEntity<String> addRecord(@RequestBody ReadingRecord readingRecord) {
	    try {
	    	readingRecordService.addRecord(
	    		    readingRecord.getBookId(),
	    		    readingRecord.getUserId(),
	    		    readingRecord.getReadDate(),
	    		    readingRecord.getTotalTime(),
	    		    readingRecord.getStartTime(),
	    		    readingRecord.getEndTime()
	    		);
	    	return ResponseEntity.ok("success");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("fail: " + e.getMessage());
	    }
	}

	
	
	//사용자의 연간 월별 독서 읽은 시간 조회
	@GetMapping("/stats/time/yylist")
	public List<Map<String,Integer>> getAnnualMontlyReadingTime(@RequestParam("userId") Integer userId, @RequestParam("year") Integer year){
		return readingRecordService.getMonthlyTotalTimeByUserAndYear(userId, year); 
	} 
	
	
	//사용자별 총 읽은 시간 조회
	@GetMapping("/stats/time")
	 public Integer getTotalReadingTime(@RequestParam("userId") Integer userId) {
        return readingRecordService.getTotalReadingTimeByUserId(userId);
    }
	
	//사용자별 연간 총 읽은 시간 조회
	@GetMapping("/stats/time/yy")
	public Integer getAnnualReadingTime(@RequestParam("userId") Integer userId, @RequestParam("year") Integer year){
		return readingRecordService.getTotalReadingTimeByUserIdAndYear(userId, year); 
	    }
	
	//사용자의 연간>월별>책 >읽은 시간  : 전체 (시간 중심) 
	@GetMapping("/stats/time/book_id")
	public List<Map<String,Object>> getReadingTimeOrderTime(@RequestParam("userId") Integer userId){
		return readingRecordService.getTimeYearMonthBookStats(userId); 
	} 
	
	//사용자의 연간>월별>읽은 시간>책  : 전체 (책 중심) 
		@GetMapping("/stats/book/book_id")
		public List<Map<String,Object>> getReadingTimeOrderBook(@RequestParam("userId") Integer userId){
			return readingRecordService.getBookTimeByYearMonth(userId); 
		} 
	
	
	//사용자 연>월>책>읽은시간 : 특정 년도와 월 
		@GetMapping("/stats/time/yymm/book_id")
		public List<Map<String,Object>> getReadingTimeBookIdWithYymm(@RequestParam("userId") Integer userId, @RequestParam("year") Integer year ,@RequestParam("month") Integer month){
			return readingRecordService.getYearMonthBookStats(userId,year,month); 
		} 
	
	
	
	
	

	

}
