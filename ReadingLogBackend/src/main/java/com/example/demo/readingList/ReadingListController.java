package com.example.demo.readingList;

import org.springframework.data.domain.Pageable;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.response.ApiResponse;


@RestController
@RequestMapping("/readinglist")
public class ReadingListController {

    private final ReadingListService readingListService;

    public ReadingListController(ReadingListService readingListService) {
        this.readingListService = readingListService;
    }

    // 이번달 독서 리스트
    @GetMapping("/yymm")
    public ResponseEntity<Map<String, Object>> getMonthlyReadingList(@RequestParam Integer userId, @RequestParam Integer year, @RequestParam Integer month, @PageableDefault(size = 10, page = 0) Pageable pageable) {
        Map<String, Object> rtn = readingListService.getMonthlyReadingList(userId, year, month, pageable);

        Boolean success = (Boolean) rtn.get("success");

        if (Boolean.TRUE.equals(success)) {
            return ResponseEntity.ok(rtn);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rtn);
        }
        
    }

}

