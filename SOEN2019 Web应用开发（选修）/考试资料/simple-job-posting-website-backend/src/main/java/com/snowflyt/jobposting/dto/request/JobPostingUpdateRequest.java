package com.snowflyt.jobposting.dto.request;

import com.snowflyt.jobposting.entity.job.SalaryBy;
import lombok.Data;

import java.util.List;

@Data
public class JobPostingUpdateRequest {

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
