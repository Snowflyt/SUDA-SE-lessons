package cn.enilu.flash.bean.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TermDto {
    private String termId;
    private String termName;
    private LocalDate termStart;
    private LocalDate termEnd;
    private int termHasWeek;
}
