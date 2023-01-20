package com.snowflyt.jobposting.exception;

/**
 * exception for role not found in database
 */
public class RoleNotFoundException extends RuntimeException {

    public RoleNotFoundException() {
    }

    public RoleNotFoundException(String message) {
        super(message);
    }

}
