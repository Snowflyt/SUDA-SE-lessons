package com.snowflyt.jobposting.filter;

import com.snowflyt.jobposting.exception.JwtAuthenticationException;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.web.filter.authc.BearerHttpAuthenticationFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/*
 * used to check if the token is valid
 */
@Slf4j
@SuppressWarnings("java:S110")
public class JwtFilter extends BearerHttpAuthenticationFilter {

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        var result = super.onAccessDenied(request, response);
        log.info("onAccessDenied " + result);
        if (!result) {
            // the error of jwt validator cannot be thrown up,
            // which should be the imperfect mechanism of shiro
            throw new JwtAuthenticationException("Token expired or invalid, please retry!");
        }
        return result;
    }

}
