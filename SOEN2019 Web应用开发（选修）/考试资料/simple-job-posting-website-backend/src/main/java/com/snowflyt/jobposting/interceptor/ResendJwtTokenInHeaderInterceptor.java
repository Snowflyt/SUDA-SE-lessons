package com.snowflyt.jobposting.interceptor;

import com.snowflyt.jobposting.util.AuthUtil;
import com.snowflyt.jobposting.util.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;

public class ResendJwtTokenInHeaderInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull Object handler
    ) {
        var jwtUser = AuthUtil.getJwtUserFromSecurityManager();
        var newToken = JwtUtil.createJwtTokenByJwtUser(jwtUser);
        response.setHeader(HttpHeaders.AUTHORIZATION, newToken);
        return true;
    }

}
