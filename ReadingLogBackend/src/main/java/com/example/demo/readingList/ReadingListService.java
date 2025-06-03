package com.example.demo.readingList;

import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.example.demo.readingrecord.ReadingRecordService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.code.BookStatus;

@Service
public class ReadingListService {

    private final ReadingListRepository readingListRepository;

    public ReadingListService(ReadingListRepository readingListRepository) {
        this.readingListRepository = readingListRepository;
    }


    // 이번달 독서 리스트
	public Map<String, Object> getMonthlyReadingList(Integer userId, Pageable pageable) {
        Map<String, Object> rtn = new HashMap<>();

        try {
            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMM");
            String yymm = today.format(formatter);

            Page<ReadingList> monthlyReadingPage = readingListRepository.getMontlyReadingList(userId, yymm, pageable);

            List<ReadingListDto> readingListDtoList = monthlyReadingPage.getContent().stream()
                    .map(ReadingListDto::fromEntity)
                    .collect(Collectors.toList());

            rtn.put("monthlyReadingList", readingListDtoList);

            Map<String, Object> pageInfo = new HashMap<>();
            pageInfo.put("size", monthlyReadingPage.getSize());
            pageInfo.put("number", monthlyReadingPage.getNumber());
            pageInfo.put("totalElements", monthlyReadingPage.getTotalElements());
            pageInfo.put("totalPages", monthlyReadingPage.getTotalPages());
            rtn.put("page", pageInfo);

            rtn.put("success", true);

        } catch (Exception e) {
            rtn.clear();
            rtn.put("success", false);
            rtn.put("message", "데이터를 불러오는 데 실패했습니다.");
            e.printStackTrace();
        }

        return rtn;
    }
}