package com.snowflyt.jobposting.aspect;

import com.snowflyt.jobposting.exception.JobPostingNotFoundException;
import com.snowflyt.jobposting.service.JobPostingService;
import com.snowflyt.jobposting.util.AuthUtil;
import org.apache.shiro.authz.UnauthorizedException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Component;

@Aspect
@Configurable
@Component
public class RequireAdminOrPosterHimselfAspect {

    private final JobPostingService jobPostingService;

    public RequireAdminOrPosterHimselfAspect(JobPostingService jobPostingService) {
        this.jobPostingService = jobPostingService;
    }

    @Around("@annotation(RequireAdminOrPosterHimself)")
    public Object requireAdminOrPosterHimself(ProceedingJoinPoint joinPoint) throws Throwable {
        var postingId = (Long) joinPoint.getArgs()[0];
        var posting = jobPostingService.findJobPosting(postingId).orElseThrow(JobPostingNotFoundException::new);

        var jwtUser = AuthUtil.getJwtUserFromSecurityManager();
        if (AuthUtil.notAdmin(jwtUser) && AuthUtil.notPoster(jwtUser, posting)) {
            throw new UnauthorizedException();
        }

        return joinPoint.proceed();
    }

}
