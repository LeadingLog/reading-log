package com.example.demo.readingrecord;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reading_record")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long num;

    @Column(name = "book_id")
    private String bookId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "read_date", nullable = false)
    private LocalDate readDate;

    @Column(name = "total_time", nullable = false)
    private Integer totalTime;  

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

}

