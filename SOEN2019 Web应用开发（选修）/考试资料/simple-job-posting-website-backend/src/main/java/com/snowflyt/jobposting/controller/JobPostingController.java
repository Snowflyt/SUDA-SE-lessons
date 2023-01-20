package com.snowflyt.jobposting.controller;

import com.snowflyt.jobposting.aspect.RequireAdminOrPosterHimself;
import com.snowflyt.jobposting.dto.info.JobPostingDto;
import com.snowflyt.jobposting.dto.request.JobPostingCreationRequest;
import com.snowflyt.jobposting.dto.request.JobPostingUpdateRequest;
import com.snowflyt.jobposting.entity.job.JobPosting;
import com.snowflyt.jobposting.exception.JobPostingNotFoundException;
import com.snowflyt.jobposting.exception.UserNotFoundException;
import com.snowflyt.jobposting.service.JobPostingService;
import com.snowflyt.jobposting.service.UserService;
import com.snowflyt.jobposting.util.AuthUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class JobPostingController {

    private final UserService userService;

    private final JobPostingService jobPostingService;

    public JobPostingController(UserService userService, JobPostingService jobPostingService) {
        this.userService = userService;
        this.jobPostingService = jobPostingService;
    }

    /**
     * Get all job postings. (no need for token)
     */
    @GetMapping("/job-postings")
    public List<JobPosting> getAllJobPostings() {
        return jobPostingService.findAllJobPostings();
    }

    /**
     * Get job posting by posting id.
     */
    @GetMapping("/job-posting/{id}")
    public JobPosting getJobPosting(@PathVariable Long id) {
        return jobPostingService.findJobPosting(id).orElseThrow(JobPostingNotFoundException::new);
    }

    /**
     * Delete job posting by posting id. (only for admin or job poster)
     */
    @DeleteMapping("/job-posting/{id}")
    @RequireAdminOrPosterHimself
    public void deleteJobPosting(@PathVariable Long id) {
        jobPostingService.deleteJobPosting(id);
    }

    /**
     * Create a new job posting.
     */
    @PostMapping("/job-posting")
    public JobPostingDto createJobPosting(@RequestBody JobPostingCreationRequest request) {
        var jwtUser = AuthUtil.getJwtUserFromSecurityManager();
        var currentUser = userService.findUserById(jwtUser.getId()).orElseThrow(UserNotFoundException::new);

        var jobPosting = JobPosting.builder()
                .poster(currentUser)
                .jobTitle(request.getJobTitle())
                .salaryFrom(request.getSalaryFrom())
                .salaryTo(request.getSalaryTo())
                .salaryBy(request.getSalaryBy())
                .region(request.getRegion())
                .education(request.getEducation())
                .experience(request.getExperience())
                .description(request.getDescription())
                .labels(request.getLabels())
                .build();

        return jobPostingService.saveJobPosting(jobPosting).toDto();
    }

    /**
     * Get current users job postings.
     */
    @GetMapping("/job-posting/me")
    public List<JobPostingDto> getCurrentUserJobPostings() {
        var jwtUser = AuthUtil.getJwtUserFromSecurityManager();
        var currentUser = userService.findUserById(jwtUser.getId()).orElseThrow(UserNotFoundException::new);

        return jobPostingService.findAllJobPostings().stream()
                .filter(jobPosting -> jobPosting.getPoster().getId().equals(currentUser.getId()))
                .map(JobPosting::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Update job posting by posting id. (only for admin or job poster)
     */
    @PatchMapping("/job-posting/{id}")
    @RequireAdminOrPosterHimself
    public void updateJobPosting(@PathVariable Long id, @RequestBody JobPostingUpdateRequest request) {
        var jobPosting = jobPostingService.findJobPosting(id).orElseThrow(JobPostingNotFoundException::new);

        if (request.getJobTitle() != null) {
            jobPosting.setJobTitle(request.getJobTitle());
        }
        if (request.getSalaryFrom() != null) {
            jobPosting.setSalaryFrom(request.getSalaryFrom());
        }
        if (request.getSalaryTo() != null) {
            jobPosting.setSalaryTo(request.getSalaryTo());
        }
        if (request.getSalaryBy() != null) {
            jobPosting.setSalaryBy(request.getSalaryBy());
        }
        if (request.getRegion() != null) {
            jobPosting.setRegion(request.getRegion());
        }
        if (request.getEducation() != null) {
            jobPosting.setEducation(request.getEducation());
        }
        if (request.getExperience() != null) {
            jobPosting.setExperience(request.getExperience());
        }
        if (request.getDescription() != null) {
            jobPosting.setDescription(request.getDescription());
        }
        if (request.getLabels() != null) {
            jobPosting.setLabels(request.getLabels());
        }

        jobPostingService.saveJobPosting(jobPosting);
    }

}
