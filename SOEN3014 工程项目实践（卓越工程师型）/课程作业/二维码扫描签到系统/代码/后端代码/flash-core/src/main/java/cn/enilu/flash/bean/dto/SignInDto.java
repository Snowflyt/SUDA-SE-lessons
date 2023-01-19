package cn.enilu.flash.bean.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SignInDto {
    private String studentId;
    private String courseId;
    private String day;
    private String week;
    private String lesson;
    private String qrCreator;
    private LocalDateTime qrCreatTime;
}
