package com.snowflyt.jobposting.exception;

/**
 * exception for jwt authentication failed in JwtFilter
 */
public class JwtAuthenticationException extends RuntimeException {

    public JwtAuthenticationException() {
    }

    public JwtAuthenticationException(String message) {
        super(message);
    }

}
