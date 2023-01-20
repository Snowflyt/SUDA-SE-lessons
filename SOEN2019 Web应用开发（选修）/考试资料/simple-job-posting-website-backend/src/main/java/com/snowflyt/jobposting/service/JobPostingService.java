package com.snowflyt.jobposting.service;

import com.snowflyt.jobposting.entity.job.JobPosting;
import com.snowflyt.jobposting.repository.JobPostingRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class JobPostingService {

    private final JobPostingRepository jobPostingRepository;

    public JobPostingService(JobPostingRepository jobPostingRepository) {
        this.jobPostingRepository = jobPostingRepository;
    }

    /**
     * find all job postings in database
     */
    public List<JobPosting> findAllJobPostings() {
        return jobPostingRepository.findAll();
    }

    /**
     * find job posting in database by posting id
     */
    public Optional<JobPosting> findJobPosting(Long postingId) {
        return jobPostingRepository.findById(postingId);
    }

    /**
     * delete job posting in database by posting id
     */
    @Transactional
    public void deleteJobPosting(Long postingId) {
        jobPostingRepository.deleteById(postingId);
    }

    /**
     * save job posting to database
     */
    public JobPosting saveJobPosting(JobPosting jobPosting) {
        return jobPostingRepository.save(jobPosting);
    }

}
