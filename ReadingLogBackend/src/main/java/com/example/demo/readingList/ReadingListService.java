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

	   

	}