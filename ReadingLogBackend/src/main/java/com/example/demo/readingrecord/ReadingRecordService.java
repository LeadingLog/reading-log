package com.example.demo.readingrecord;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReadingRecordService {

	private final ReadingRecordRepository readingRecordRepository;

	public ReadingRecordService(ReadingRecordRepository readingRecordRepository) {
		this.readingRecordRepository = readingRecordRepository;
	}

	// 추가 하기
	@Transactional
	public ReadingRecord addRecord(Integer bookId, Integer userId, LocalDate readDate, Integer totalTime,
			LocalTime startTime, LocalTime endTime) {

		ReadingRecord readingRecord = ReadingRecord.builder().bookId(bookId).userId(userId).readDate(readDate)
				.totalTime(totalTime).startTime(startTime).endTime(endTime).build();

		return readingRecordRepository.save(readingRecord);
	};

	// 사용자의 연간 월별 읽은 총 시간 2025년 검색하면 -> ["toTalReadingTime": 5000, { "month": 1,
	// "complete": 120 }, ... ]
	public Map<String, Object> getMonthlyTotalTimeByUserAndYear(Integer userId, Integer year) {

		List<Object[]> rawResults = readingRecordRepository.findMonthlyTotalTimeByUserAndYear(userId, year);

		Map<String, Object> resultList = new HashMap<>();
		List<Map<String, Integer>> monthlyList = new ArrayList<>();

		int totalReadingTime = 0;

		for (Object[] row : rawResults) {
			int month = ((Number) row[0]).intValue();
			int complete = ((Number) row[1]).intValue();

			totalReadingTime += complete;

			Map<String, Integer> map = new HashMap<>();
			map.put("month", month);
			map.put("complete", complete);
			monthlyList.add(map);
		}

		resultList.put("totalReadingTime", totalReadingTime);
		resultList.put("monthlyReadingList", monthlyList);

		return resultList;
	}

	// 사용자의 전체 익은 시간
	@Transactional(readOnly = true)
	public Integer getTotalReadingTimeByUserId(Integer userId) {
		return readingRecordRepository.findTotalReadingTimeByUserId(userId);
	}

	// 연간 총 독서 시간
	@Transactional(readOnly = true)
	public Integer getTotalReadingTimeByUserIdAndYear(Integer userId, Integer year) {
		return readingRecordRepository.findTotalReadingTimeByUserIdAndYear(userId, year);
	}

	// 사용자의 특정 년>월에 읽은 도서의 독서시간
	public Map<String, Object> getYearMonthBookStats(Integer userId, Integer year, Integer month) {
		List<Object[]> rawResults = readingRecordRepository.findExactYearMonthBookTotalTimeByUserId(userId, year,
				month);

		Map<String, Object> resultList = new HashMap<>();
		List<Map<String, Object>> monthlyList = new ArrayList<>();
		int totalReadingTime = 0;

		for (Object[] row : rawResults) {

			Long bookId = (long) ((Number) row[3]).intValue();
			String bookTitle = (String) row[1];
			String bookStatus = (String) row[2];
			int bookTime = ((Number) row[3]).intValue();

			totalReadingTime += bookTime;

			Map<String, Object> map = new HashMap<>();

			map.put("booId", bookId);
			map.put("bookTitle", bookTitle);
			map.put("bookStatus", bookStatus); 
			map.put("bookTime", bookTime);

			monthlyList.add(map);
		}
		
		resultList.put("todayReadingTime", totalReadingTime);
		resultList.put("monthlyReadingList", monthlyList); 

		return resultList;
	}
	
	//사용자별 오늘 읽은 책 시간 
	public Integer getReadingTotalTimeToday(Integer userId) {
		    Integer totalTime = readingRecordRepository.findTodayTotalReadingTimeByUser(userId);
		    return totalTime != null ? totalTime : 0;
		}
		
	
//	// 사용자의 총 연간>월별>책별>읽은 시간
//	public List<Map<String, Object>> getTimeYearMonthBookStats(Integer userId) {
//		List<Object[]> rawResults = readingRecordRepository.findYearMonthBookTotalTimeByUserId(userId);
//		List<Map<String, Object>> resultList = new ArrayList<>();
//
//		for (Object[] row : rawResults) {
//			int year = ((Number) row[0]).intValue();
//			int month = ((Number) row[1]).intValue();
//			String bookId = (String) row[2];
//			int totalTime = ((Number) row[3]).intValue();
//
//			// year와 month로 그룹핑된 entry 찾기
//			Map<String, Object> found = resultList.stream()
//					.filter(entry -> ((Integer) entry.get("year") == year && (Integer) entry.get("month") == month))
//					.findFirst().orElse(null);
//
//			if (found == null) {
//				// 새로 만들기
//				Map<String, Object> newEntry = new HashMap<>();
//				newEntry.put("year", year);
//				newEntry.put("month", month);
//				Map<String, Integer> bookTime = new HashMap<>();
//				bookTime.put(bookId, totalTime);
//				newEntry.put("bookTime", bookTime);
//				resultList.add(newEntry);
//			} else {
//				// 기존에 추가된 month/year에 bookId 누적
//				Map<String, Integer> bookTime = (Map<String, Integer>) found.get("bookTime");
//				bookTime.put(bookId, totalTime);
//			}
//		}
//
//		return resultList;
//	}

//	// 사용자의 총 연간>월별>읽은 시간>책 (책중심)
//	public List<Map<String, Object>> getBookTimeByYearMonth(Integer userId) {
//		List<Object[]> rawResults = readingRecordRepository.findBookTimeByYearMonth(userId);
//		List<Map<String, Object>> resultList = new ArrayList<>();
//
//		for (Object[] row : rawResults) {
//			String bookId = (String) row[0];
//			int year = ((Number) row[1]).intValue();
//			int month = ((Number) row[2]).intValue();
//			int totalTime = ((Number) row[3]).intValue();
//
//			// 해당 bookId에 대한 연/월별 시간 찾기
//			Map<String, Object> found = resultList.stream().filter(entry -> entry.get("bookId").equals(bookId))
//					.findFirst().orElse(null);
//
//			if (found == null) {
//				// 새로운 책에 대해 연/월 시간 추가
//				Map<String, Object> newEntry = new HashMap<>();
//				newEntry.put("bookId", bookId);
//				Map<String, Integer> timeDate = new HashMap<>();
//				timeDate.put(year + "-" + String.format("%02d", month), totalTime);
//				newEntry.put("timeDate", timeDate);
//				resultList.add(newEntry);
//			} else {
//				// 기존 책에 연/월 시간 추가
//				Map<String, Integer> timeDate = (Map<String, Integer>) found.get("timeDate");
//				timeDate.put(year + "-" + String.format("%02d", month), totalTime);
//			}
//		}
//
//		return resultList;
//	}

}
