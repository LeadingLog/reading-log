package com.example.demo.readingList;

import com.example.demo.code.BookStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingListDto {
    private String bookTitle;
    private String author;
    private String isbn13;
    private long bookId;
    private String coverImgUrl;
    private String link;
    private LocalDate readStartDt;
    private LocalDate readEndDt;

    private BookStatus bookStatus;
//    private boolean isFavorite;
//    private LocalDate createdAt;

    public static ReadingListDto fromEntity(ReadingList readingList) {
        boolean isFavoriteValue = readingList.getReadEndDt()== null
                                    && readingList.getReadStartDt() == null;

        return ReadingListDto.builder()
                .bookTitle(readingList.getBookTitle()) // bookTitle -> title 매핑
                .author(readingList.getAuthor())
                .isbn13(readingList.getIsbn13())
                .bookId(readingList.getBookId())
                .coverImgUrl(readingList.getCoverImgUrl()) // coverImgUrl -> cover 매핑
                .link(readingList.getLink())
                .readStartDt(readingList.getReadStartDt())
                .readEndDt(readingList.getReadEndDt())
                .bookStatus(readingList.getBookStatus()) // 변환된 readStatus 설정
//                .isFavorite(isFavoriteValue) // 계산된 isFavorite 설정
//                .createdAt(readingList.getCreatedAt()) // createdAt 필드 설정
                .build();
    }


}
