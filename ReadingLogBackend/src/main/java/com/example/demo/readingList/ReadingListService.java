package com.example.demo.readingList;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.code.BookStatus;

@Service
public class ReadingListService {

	private final ReadingListRepository readingListRepository;

	public ReadingListService(ReadingListRepository readingListRepository) {
		this.readingListRepository = readingListRepository;
	}

	@Transactional
	public void addReadingList(Map<String, Object> request) {
		Integer userId = Integer.parseInt(request.get("userId").toString());
		String bookTitle = (String) request.get("bookTitle");
		String author = (String) request.get("author");
		String isbn13 = (String) request.get("isbn13");
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
				.isbn13(isbn13).coverImgUrl(coverImgUrl).bookStatus(convertStatus(bookStatusStr))
				.readStartDt(readStartDt).readEndDt(readEndDt).finishChk(null).createdAt(createdAt).updDate(null)
				.build();

		readingListRepository.save(readingList);
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

	@Transactional
	public void updateReadingList(Map<String, Object> request) {
		Long bookId = Long.parseLong(request.get("bookId").toString());
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

		// 저장
		readingListRepository.save(readingList);
	}
	
	@Transactional
	public void deleteReadingList(Map<String, Object> request) {
	    Long bookId = Long.parseLong(request.get("bookId").toString());
	    Integer userId = Integer.parseInt(request.get("userId").toString());

	    ReadingList readingList = readingListRepository.findById(bookId)
	            .orElseThrow(() -> new IllegalArgumentException("해당 책이 목록에 존재하지 않습니다."));

	    if (!readingList.getUserId().equals(userId)) {
	        throw new IllegalArgumentException("해당 사용자에 대한 책이 아닙니다.");
	    }

	    readingListRepository.delete(readingList);
	}

}
