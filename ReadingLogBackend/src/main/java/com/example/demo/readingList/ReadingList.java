package com.example.demo.readingList;

import com.example.demo.code.BookStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reading_list")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingList {
    @Id
    private String bookId;
    @Enumerated(EnumType.STRING)
    private BookStatus bookStatus;
}
