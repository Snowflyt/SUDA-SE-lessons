package com.snowflyt.jobposting.dto.request;

import com.snowflyt.jobposting.entity.job.SalaryBy;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class JobPostingCreationRequest {

    @NotNull
    private String jobTitle;

    @NotNull
    private Integer salaryFrom;

    @NotNull
    private Integer salaryTo;

    @NotNull
    private SalaryBy salaryBy;

    @NotNull
    private String region;

    @NotNull
    private String education;

    @NotNull
    private String experience;

    @NotNull
    private String description;

    @NotNull
    private List<String> labels;

}
