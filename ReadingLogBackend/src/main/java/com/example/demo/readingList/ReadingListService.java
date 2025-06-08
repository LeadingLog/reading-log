package com.example.demo.readingList;

import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

import java.time.Year;
import java.time.format.DateTimeFormatter;

import java.util.*;

import java.time.YearMonth;

import java.util.stream.Collectors;


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

    public List<ReadingCountByMonthDto> readingCountByMonth(Integer userId, Integer year) {
        List<ReadingListRepository.MonthlyStatusRawCountProjection> rawCounts = readingListRepository.readingCountByMonth(userId, year);

        Map<YearMonth, ReadingCountByMonthDto> summaryMap = new HashMap<>();
        for (int month = 1; month <= 12; month++) {
            YearMonth ym = YearMonth.of(year, month);
            summaryMap.put(ym, new ReadingCountByMonthDto(year, month));
        }

        for (ReadingListRepository.MonthlyStatusRawCountProjection rawCount : rawCounts) {
            YearMonth yearMonth = null;
            if (rawCount.getYear() != null && rawCount.getMonth() != null) {
                yearMonth = YearMonth.of(rawCount.getYear(), rawCount.getMonth());
            }
            if (yearMonth != null && summaryMap.containsKey(yearMonth)) {
                ReadingCountByMonthDto summary = summaryMap.get(yearMonth);
                String bookStatus = rawCount.getBookStatus();

                if (BookStatus.NOT_STARTED.name().equals(bookStatus)) {
                    summary.setNotStarted(summary.getNotStarted() + rawCount.getMonthlyCount());
                } else if (BookStatus.IN_PROGRESS.name().equals(bookStatus)) {
                    summary.setInProgress(summary.getInProgress() + rawCount.getMonthlyCount());
                } else if (BookStatus.COMPLETED.name().equals(bookStatus)) {
                    summary.setCompleted(summary.getCompleted() + rawCount.getMonthlyCount());
                }
            }
        }

        List<ReadingCountByMonthDto> rtnList = new ArrayList<>(summaryMap.values());
        rtnList.sort(Comparator.comparingInt(ReadingCountByMonthDto::getMonth));

        return rtnList;
    }


    // 월별 독서 리스트
    public Map<String, Object> getMonthlyReadingList(Integer userId, Integer year, Integer month, Pageable pageable) {
        Map<String, Object> rtn = new HashMap<>();

        try {
            String yymm = String.format("%d%02d", year, month);

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


    private BookStatus convertStatus(String status) {
        return switch (status) {
            case "NOT_STARTED" -> BookStatus.NOT_STARTED;
            case "IN_PROGRESS" -> BookStatus.IN_PROGRESS;
            case "COMPLETED" -> BookStatus.COMPLETED;
            case "INTERESTED" -> BookStatus.INTERESTED;
            default -> throw new IllegalArgumentException("status error: " + status);
        };
    }

    //책 추가하기 (관심도서 & 그냥)
    @Transactional
    public void addReadingList(Map<String, Object> request) {
        Integer userId = Integer.parseInt(request.get("userId").toString());
        String bookTitle = (String) request.get("bookTitle");
        String author = (String) request.get("author");
        String isbn13 = (String) request.get("isbn13");
        String link = (String) request.get("link");
        String coverImgUrl = (String) request.get("coverImgUrl");
        String bookStatusStr = (String) request.get("bookStatus");

        LocalDate readStartDt = null;
        LocalDate readEndDt = null;

        // 날짜 필드가 있는 경우
        if (request.containsKey("readStartDt") && request.containsKey("readEndDt")) {
            readStartDt = LocalDate.parse(request.get("readStartDt").toString());
            readEndDt = LocalDate.parse(request.get("readEndDt").toString());
        }

        LocalDate createdAt = LocalDate.now();

        ReadingList readingList = ReadingList.builder().userId(userId).bookTitle(bookTitle).author(author)
                .isbn13(isbn13).link(link).coverImgUrl(coverImgUrl).bookStatus(convertStatus(bookStatusStr))
                .readStartDt(readStartDt).readEndDt(readEndDt).finishChk(null).createdAt(createdAt).updDate(null)
                .build();

        readingListRepository.save(readingList);
    }

    //책 상태 값 변경
    @Transactional
    public void updateReadingList(Map<String, Object> request) {
        Integer bookId = Integer.parseInt(request.get("bookId").toString());
        Integer userId = Integer.parseInt(request.get("userId").toString());
        String bookStatusStr = (String) request.get("bookStatus");

        LocalDate readStartDt = null;
        LocalDate readEndDt = null;

        // 날짜 필드가 있는 경우 (즐겨찾기에서 기본으로 변경)
        if (request.containsKey("readStartDt") && request.containsKey("readEndDt")) {
            readStartDt = LocalDate.parse(request.get("readStartDt").toString());
            readEndDt = LocalDate.parse(request.get("readEndDt").toString());
        }

        // 기존 데이터 가져오기
        ReadingList readingList = readingListRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 책이 목록에 존재하지 않습니다."));

        // 유저 확인
        if (!readingList.getUserId().equals(userId)) {
            throw new IllegalArgumentException("해당 사용자에 대한 책이 아닙니다.");
        }

        //책 상태 변경
        BookStatus newStatus = convertStatus(bookStatusStr);


        if (newStatus == BookStatus.INTERESTED) {// 상태가 INTERESTED면 날짜 제거
            readingList.changeStatusToInterested();
        } else if (readStartDt != null && readEndDt != null) { //관심에서 읽기전으로
            readingList.changeStatusToStart(readStartDt, readEndDt);
        } else { //나머지
            readingList.changeStatus(newStatus);
        }

        readingListRepository.save(readingList);
    }

    //독서리스트 지우기
    @Transactional
    public void deleteReadingList(Map<String, Object> request) {
        Integer bookId = Integer.parseInt(request.get("bookId").toString());
        Integer userId = Integer.parseInt(request.get("userId").toString());

        ReadingList readingList = readingListRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 책이 목록에 존재하지 않습니다."));

        if (!readingList.getUserId().equals(userId)) {
            throw new IllegalArgumentException("해당 사용자에 대한 책이 아닙니다.");
        }

        readingListRepository.delete(readingList);
    }

    //책 목록 검색하기
    @Transactional
    public Page<ReadingList> getReadingListByFilter(Integer userId, Integer tabType, Pageable pageable) {
        BookStatus status = null;
        switch (tabType) {
            case 1 -> status = BookStatus.IN_PROGRESS;
            case 2 -> status = BookStatus.NOT_STARTED;
            case 3 -> status = BookStatus.COMPLETED;
            case 4 -> status = BookStatus.INTERESTED;
        }

        if (status == null) {
            return readingListRepository.findByUserIdAndBookStatusNot(userId, BookStatus.INTERESTED, pageable);
        } else {
            return readingListRepository.findByUserIdAndBookStatus(userId, status, pageable);
        }
    }


    //검색어로 책 검색하기
    @Transactional
    public List<ReadingList> getReadingListBySearch(Integer userId, Integer tabType, String query) {

        BookStatus status = null;
        switch (tabType) {
            case 1 -> status = BookStatus.IN_PROGRESS;
            case 2 -> status = BookStatus.NOT_STARTED;
            case 3 -> status = BookStatus.COMPLETED;
            case 4 -> status = BookStatus.INTERESTED;
        }

        if (status == null) {
            //전체 검색
            return readingListRepository.searchByUserIdAndQueryExcludingInterested(userId, query);
        } else {
            //필터링 된 상태에서 검색
            return readingListRepository.searchByUserIdAndQueryWithStatus(userId, status, query);
        }
    }

    //오늘 기준으로 전체 미완독 도서
    @Transactional
    public List<ReadingList> getIncompleteBook(Integer userId) {

        LocalDate today = LocalDate.now().withDayOfMonth(1);
        List<BookStatus> statuses = List.of (BookStatus.NOT_STARTED, BookStatus.IN_PROGRESS);
        return readingListRepository.findInCompleteBook(userId, statuses, today);
    }

    //오늘 기준으로 특정 년, 월 미완독 도서
    @Transactional
    public List<ReadingList> getIncompleteBook(Integer userId, Integer year, Integer month) {

        LocalDate targetDate = LocalDate.of(year, month, YearMonth.of(year, month).lengthOfMonth());
        List<BookStatus> statuses = List.of (BookStatus.NOT_STARTED, BookStatus.IN_PROGRESS);
        return readingListRepository.findInCompleteBookInMonth(userId, statuses, targetDate);
    }


}

