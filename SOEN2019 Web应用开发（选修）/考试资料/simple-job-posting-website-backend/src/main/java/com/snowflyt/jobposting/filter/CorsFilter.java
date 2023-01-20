package com.snowflyt.jobposting.filter;

import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.web.filter.PathMatchingFilter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
 * used to solve CORS problem
 */
@Slf4j
@SuppressWarnings("java:S110")
public class CorsFilter extends PathMatchingFilter {

    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        var httpRequest = (HttpServletRequest) request;
        var httpResponse = (HttpServletResponse) response;

        // options and other methods share the same logic
        configHeaders(httpRequest, httpResponse);
        if (httpRequest.getMethod().equals(RequestMethod.OPTIONS.name())) {
            log.debug("OPTION request received: " + httpRequest.getRequestURI());
            httpResponse.setStatus(HttpStatus.NO_CONTENT.value());
            return false;
        }

        return super.preHandle(request, response);
    }

    private void configHeaders(HttpServletRequest request, HttpServletResponse response) {
        // configure CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
        // prevent encoding problems, suitable for JSON data
        response.setHeader("Content-Type", "application/json;charset=UTF-8");
    }

}
