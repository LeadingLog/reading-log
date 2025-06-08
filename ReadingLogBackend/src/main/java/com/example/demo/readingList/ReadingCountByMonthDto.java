package com.example.demo.readingList;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class ReadingCountByMonthDto {
    private int year;
    private int month;
    private long notStarted;
    private long inProgress;
    private long completed;

    public ReadingCountByMonthDto(int year, int month) {
        this.year = year;
        this.month = month;
        this.notStarted = 0;
        this.inProgress = 0;
        this.completed = 0;
    }
}
