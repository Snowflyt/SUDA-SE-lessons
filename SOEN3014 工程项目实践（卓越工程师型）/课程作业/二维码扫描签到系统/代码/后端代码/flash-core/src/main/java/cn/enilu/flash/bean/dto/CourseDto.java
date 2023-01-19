package cn.enilu.flash.bean.dto;

import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

@Data
public class CourseDto {
    private Long id;

    private String courseId;

    private String name;

    private String location;

    private String time;

}
