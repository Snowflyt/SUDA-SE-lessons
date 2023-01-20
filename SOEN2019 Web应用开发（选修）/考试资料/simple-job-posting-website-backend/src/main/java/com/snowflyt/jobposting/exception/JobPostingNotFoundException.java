package com.snowflyt.jobposting.exception;

/**
 * exception for job posting not found in database
 */
public class JobPostingNotFoundException extends RuntimeException {

    public JobPostingNotFoundException() {
    }

    public JobPostingNotFoundException(String message) {
        super(message);
    }

}
