package com.snowflyt.jobposting.exception;

import com.snowflyt.jobposting.dto.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;
import java.util.Arrays;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionController {

    /**
     * password incorrect
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> authenticationExceptionHandler(AuthenticationException e) {
        log.error("AuthenticationException");
        log.error(e.getLocalizedMessage());

        return new ResponseEntity<>(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.FORBIDDEN.value(),
                        HttpStatus.FORBIDDEN.getReasonPhrase(),
                        "authentication failed"
                ),
                HttpStatus.FORBIDDEN
        );
    }

    /**
     * job posting not found in database
     */
    @ExceptionHandler(JobPostingNotFoundException.class)
    public ResponseEntity<ErrorResponse> jobPostingNotFoundExceptionHandler(JobPostingNotFoundException e) {
        log.error("JobPostingNotFoundException");
        log.error(e.getLocalizedMessage());

        return new ResponseEntity<>(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.NOT_FOUND.value(),
                        HttpStatus.NOT_FOUND.getReasonPhrase(),
                        e.getMessage() == null ? "job posting not found" : e.getMessage()
                ),
                HttpStatus.NOT_FOUND
        );
    }

    /**
     * user not found in database
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> userNotFoundExceptionHandler(UserNotFoundException e) {
        log.error("UserNotFoundException");
        log.error(e.getLocalizedMessage());

        return new ResponseEntity<>(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.NOT_FOUND.value(),
                        HttpStatus.NOT_FOUND.getReasonPhrase(),
                        e.getMessage() == null ? "user not found" : e.getMessage()
                ),
                HttpStatus.NOT_FOUND
        );
    }

    /**
     * duplicate username in database
     */
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> userAlreadyExistsExceptionHandler(UserAlreadyExistsException e) {
        log.error("UserAlreadyExistsException");
        log.error(e.getLocalizedMessage());

        return new ResponseEntity<>(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.CONFLICT.value(),
                        HttpStatus.CONFLICT.getReasonPhrase(),
                        e.getMessage() == null ? "user already exists" : e.getMessage()
                ),
                HttpStatus.CONFLICT);
    }

    /**
     * role not found in database
     */
    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<ErrorResponse> userNotFoundExceptionHandler(RoleNotFoundException e) {
        log.error("RoleNotFoundException");
        log.error(e.getLocalizedMessage());

        return new ResponseEntity<>(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.NOT_FOUND.value(),
                        HttpStatus.NOT_FOUND.getReasonPhrase(),
                        e.getMessage() == null ? "role not found" : e.getMessage()
                ),
                HttpStatus.NOT_FOUND
        );
    }

    /**
     * user is authenticated but not authorized
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> unauthorizedExceptionHandler(UnauthorizedException e) {
        log.error("UnauthorizedExceptionHandler");
        log.error(e.getLocalizedMessage());

        return new ResponseEntity<>(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.UNAUTHORIZED.value(),
                        HttpStatus.UNAUTHORIZED.getReasonPhrase(),
                        "unauthorized user"
                ),
                HttpStatus.UNAUTHORIZED
        );
    }

    /**
     * path not found
     */
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> noHandlerFoundExceptionHandler(NoHandlerFoundException e) {
        log.error("NoHandlerFoundExceptionHandler");
        log.error(e.getLocalizedMessage());

        return new ResponseEntity<>(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.NOT_FOUND.value(),
                        HttpStatus.NOT_FOUND.getReasonPhrase(),
                        "path not found"
                ),
                HttpStatus.NOT_FOUND
        );
    }

    /**
     * default exception handler
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception e) {
        log.error("ExceptionHandler");
        log.error(e.toString());
        log.error(e.getLocalizedMessage());
        log.error(Arrays.toString(e.getStackTrace()));

        return new ResponseEntity<>(
                new ErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                        e.getLocalizedMessage()
                ),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

}
