package com.example.demo.readingList;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.response.ApiResponse;


@RestController
@RequestMapping("/readinglist")
public class ReadingListController {

	private final ReadingListService readingListService;

    public ReadingListController(ReadingListService readingListService) {
        this.readingListService = readingListService;
    }
    

    @PostMapping("/add")
    public ResponseEntity<?> addReadingList(@RequestBody Map<String, Object> request) {
        try {
            readingListService.addReadingList(request);
            return ResponseEntity.ok(ApiResponse.success("true"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.failure(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.failure("서버 오류가 발생했습니다."));
        }
    }
    
    @PatchMapping("/update")
    public ResponseEntity<?> updateReadingList(@RequestBody Map<String, Object> request) {
        try {
            readingListService.updateReadingList(request);
            return ResponseEntity.ok(ApiResponse.success("true"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.failure(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.failure("서버 오류가 발생했습니다."));
        }
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteReadingList(@RequestBody Map<String, Object> request) {
        try {
            readingListService.deleteReadingList(request);
            return ResponseEntity.ok(ApiResponse.success("true"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.failure(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.failure("서버 오류가 발생했습니다."));
        }
    }

}

