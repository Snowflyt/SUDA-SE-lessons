package com.snowflyt.jobposting.repository;

import com.snowflyt.jobposting.entity.job.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
}
