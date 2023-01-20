package com.snowflyt.jobposting.exception;

/**
 * exception for user not found in database
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException() {
    }

    public UserNotFoundException(String message) {
        super(message);
    }

}
