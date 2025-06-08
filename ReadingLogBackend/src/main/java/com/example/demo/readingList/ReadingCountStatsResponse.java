package com.example.demo.readingList;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@NoArgsConstructor
@ToString
public class ReadingCountStatsResponse {
    private List<ReadingCountByMonthDto> readingCountByMonth;
    private boolean success;
    private String message;

    public ReadingCountStatsResponse(List<ReadingCountByMonthDto> timeLineReadingList) {
        this.readingCountByMonth = timeLineReadingList;
        this.success = true;
        this.message = null;
    }

    public ReadingCountStatsResponse(String message) {
        this.readingCountByMonth = null;
        this.success = false;
        this.message = message;
    }
}
