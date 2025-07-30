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
    private Integer bookId;
    
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "book_title", length = 255, nullable = false)
    private String bookTitle;

    @Column(name = "author", length = 100, nullable = false)
    private String author;

    @Column(name = "isbn13", length = 17, nullable = false)
    private String isbn13;
    
    @Column(name = "Aladin_link", length = 255)
    private String link;

    @Column(name = "cover_img_url", length = 255)
    private String coverImgUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "book_status", length = 20, nullable = false)
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
    
 // INTERESTED 상태로 바꿀 때 
    public void changeStatusToInterested() {
        this.bookStatus = BookStatus.INTERESTED;
        this.readStartDt = null;
        this.readEndDt = null;
        this.finishChk = null; 
        this.updDate = LocalDate.now();
    }

    // 다른 상태로 바꿀 때 
    public void changeStatus(BookStatus newStatus) {
        this.bookStatus = newStatus;
        this.updDate = LocalDate.now();

        // 완독 이면 finishChk 해당 월의 1일 추가 
        if (newStatus == BookStatus.COMPLETED) {
            LocalDate now = LocalDate.now();
            this.finishChk = LocalDate.of(now.getYear(), now.getMonth(), 1);
        } else {
            this.finishChk = null; 
        }
    }

    
    
    //그 어떤 한 상태에서 Interested 상태로 바꿀때 
    public void changeStatusToStart(LocalDate readStartDt, LocalDate readEndDt) {
        this.bookStatus = BookStatus.NOT_STARTED;  
        this.readStartDt = readStartDt;
        this.readEndDt = readEndDt;
        this.finishChk = null; 
        this.updDate = LocalDate.now();
    }
}
