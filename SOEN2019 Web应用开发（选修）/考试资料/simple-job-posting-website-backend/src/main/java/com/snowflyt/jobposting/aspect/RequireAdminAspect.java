package com.snowflyt.jobposting.aspect;

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
public class RequireAdminAspect {

    @Around("@annotation(RequireAdmin)")
    public Object requireAdminOrClazzMember(ProceedingJoinPoint joinPoint) throws Throwable {
        var jwtUser = AuthUtil.getJwtUserFromSecurityManager();

        if (AuthUtil.notAdmin(jwtUser)) {
            throw new UnauthorizedException();
        }

        return joinPoint.proceed();
    }

}
