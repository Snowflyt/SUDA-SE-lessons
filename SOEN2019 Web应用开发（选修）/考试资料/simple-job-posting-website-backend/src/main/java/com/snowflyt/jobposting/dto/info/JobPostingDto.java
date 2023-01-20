package com.snowflyt.jobposting.dto.info;

import com.snowflyt.jobposting.entity.job.SalaryBy;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostingDto {

    private Long id;

    private UserDto poster;

    private String jobTitle;

    private Integer salaryFrom;

    private Integer salaryTo;

    private SalaryBy salaryBy;

    private String region;

    private String education;

    private String experience;

    private String description;

    private List<String> labels;

}
