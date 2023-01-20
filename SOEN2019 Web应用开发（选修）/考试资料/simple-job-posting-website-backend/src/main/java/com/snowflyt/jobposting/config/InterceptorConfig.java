package com.snowflyt.jobposting.config;

import com.snowflyt.jobposting.interceptor.ResendJwtTokenInHeaderInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new ResendJwtTokenInHeaderInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(
                        "/api-docs/**",
                        "/swagger-ui/**",
                        "/static/*",
                        "/error",
                        "/login",
                        "/register",
                        "/job-postings"
                );
    }

}
