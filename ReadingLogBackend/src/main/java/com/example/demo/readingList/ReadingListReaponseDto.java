package com.example.demo.readingList;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ReadingListReaponseDto {
	
	 public static List<Map<String, Object>> convertToDtoList(List<ReadingList> bookList) {
	        return bookList.stream().map(book -> {
	            Map<String, Object> bookMap = new LinkedHashMap<>();
	            bookMap.put("bookID", book.getBookId());
	            bookMap.put("bookTitle", book.getBookTitle());
	            bookMap.put("author", book.getAuthor());
	            bookMap.put("isbn13", book.getIsbn13());
	            bookMap.put("link", book.getLink());
	            bookMap.put("coverImgUrl", book.getCoverImgUrl());
	            bookMap.put("bookStatus", book.getBookStatus());
	            bookMap.put("readStartDt", book.getReadStartDt());
	            bookMap.put("readEndDt", book.getReadEndDt());
	            return bookMap;
	        }).collect(Collectors.toList());
	    }

}
