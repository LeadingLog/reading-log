package com.example.demo.readingList;


import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.response.ApiResponse;


@RestController
@RequestMapping("/readinglist")
public class ReadingListController {

    private final ReadingListService readingListService;

    public ReadingListController(ReadingListService readingListService) {
        this.readingListService = readingListService;
    }
    

    //추가하기 
    @PostMapping("/add")
    public ResponseEntity<?> addReadingList(@RequestBody Map<String, Object> request) {
        try {
            readingListService.addReadingList(request);
            return ResponseEntity.ok(ApiResponse.success("true"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.failure(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.failure(e.getMessage()));
        }
    }
    
    //수정하기 
    @PatchMapping("/update")
    public ResponseEntity<?> updateReadingList(@RequestBody Map<String, Object> request) {
        try {
            readingListService.updateReadingList(request);
            return ResponseEntity.ok(ApiResponse.success("true"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.failure(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.failure(e.getMessage()));
        }
    }
    
    //삭제하기
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteReadingList(@RequestBody Map<String, Object> request) {
        try {
            readingListService.deleteReadingList(request);
            return ResponseEntity.ok(ApiResponse.success("true"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.failure(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.failure(e.getMessage()));
        }
    }
    
    //리스트 가져오기 
    @GetMapping("/readingList")
    public ResponseEntity<?> getReadingList(
            @RequestParam("userId") Integer userId,
            @RequestParam("tabType") Integer tabType,
            @PageableDefault(size = 10, page = 0) Pageable pageable) {

        try {
            // 기본 정렬이 없으면 bookTitle 오름차순 설정
            if (pageable.getSort().isUnsorted()) {
                pageable = PageRequest.of(
                    pageable.getPageNumber(),
                    pageable.getPageSize(),
                    Sort.by("bookTitle").ascending()
                );
            }

            Page<ReadingList> readingPage = readingListService.getReadingListByFilter(userId, tabType, pageable);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("success", true);
            response.put("tabType", tabType);

            Map<String, Object> pageInfo = new LinkedHashMap<>();
            pageInfo.put("size", readingPage.getSize());
            pageInfo.put("number", readingPage.getNumber());
            pageInfo.put("totalElements", readingPage.getTotalElements());
            pageInfo.put("totalPages", readingPage.getTotalPages());
            response.put("page", pageInfo);

            List<Map<String, Object>> readingList = ReadingListReaponseDto.convertToDtoList(readingPage.getContent());
            response.put("readingList", readingList);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.failure(e.getMessage()));
        }
    }

    
    //내 도서 리스트에서 도서 검색 
    @GetMapping("/search")
    public ResponseEntity<?> getSearchedBook(
    		 @RequestParam("userId") Integer userId,
    		 @RequestParam("tabType") Integer tabType,
    		 @RequestParam("query") String query
    		) {
    	try {
    		 List<ReadingList> bookList = readingListService.getReadingListBySearch(userId, tabType, query); 

    		//응답 값 구성 
    		 Map<String, Object> response = new LinkedHashMap<>();
             response.put("success", true);
             response.put("tabType", tabType);
             
             List<Map<String, Object>> readingList = 
            		 ReadingListReaponseDto.convertToDtoList(bookList); 

             response.put("readingList", readingList);
             return ResponseEntity.ok(response);
		
    	} catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.failure(e.getMessage()));
        }

    }
    
    //미완독 도서 조회 
    @GetMapping("/incomplete")
    public ResponseEntity<?> getIncompletedBooks(
    		@RequestParam("userId") Integer userId,
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "month", required = false) Integer month
    ) {
        try {
            List<ReadingList> bookList;

            if (year != null && month != null) {
                bookList = readingListService.getIncompleteBook(userId, year, month);
            } else {
                bookList = readingListService.getIncompleteBook(userId);
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("success", true);

            List<Map<String, Object>> readingList = ReadingListReaponseDto.convertToDtoList(bookList); 

            response.put("readingList", readingList);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.failure(e.getMessage()));
        }
    }



    // 이번달 독서 리스트
    @GetMapping("/yymm")
    public ResponseEntity<Map<String, Object>> getMonthlyReadingList(@RequestParam Integer userId, @PageableDefault(size = 10, page = 0) Pageable pageable) {
        Map<String, Object> rtn = readingListService.getMonthlyReadingList(userId, pageable);

        Boolean success = (Boolean) rtn.get("success");

        if (Boolean.TRUE.equals(success)) {
            return ResponseEntity.ok(rtn);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rtn);
        }
        
    }

}

