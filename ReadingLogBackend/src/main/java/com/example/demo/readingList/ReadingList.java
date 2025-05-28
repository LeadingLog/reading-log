package com.example.demo.readingList;

import com.example.demo.code.BookStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "reading_list")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id", nullable = false)
    private long bookId;
    
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "book_title", length = 255, nullable = false)
    private String bookTitle;

    @Column(name = "author", length = 100, nullable = false)
    private String author;

    @Column(name = "isbn13", length = 17, nullable = false)
    private String isbn13;

    @Column(name = "cover_img_url", length = 255)
    private String coverImgUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "book_status", length = 3, nullable = false)
    private BookStatus bookStatus;

    @Column(name = "read_startdt")
    private LocalDate readStartDt;

    @Column(name = "read_enddt")
    private LocalDate readEndDt;

    @Column(name = "finish_chk")
    private LocalDate finishChk;

    @Column(name = "create_date")
    private LocalDate createdAt;

    @Column(name = "upd_date")
    private LocalDate updDate;
}
