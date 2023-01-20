package com.snowflyt.mybatisdemo.entity;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Student {

    private Long id;

    private String name;

    private LocalDate birth;

}
