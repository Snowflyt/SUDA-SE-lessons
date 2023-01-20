package com.snowflyt.jobposting.util;

import com.snowflyt.jobposting.dto.JwtUser;
import com.snowflyt.jobposting.entity.job.JobPosting;
import org.apache.shiro.SecurityUtils;

public class AuthUtil {

    private AuthUtil() {
        throw new IllegalStateException("Utility class");
    }

    public static JwtUser getJwtUserFromSecurityManager() {
        return (JwtUser) SecurityUtils.getSubject().getPrincipal();
    }

    public static boolean isAdmin(JwtUser jwtUser) {
        return jwtUser.getRoles().contains("admin");
    }

    public static boolean notAdmin(JwtUser jwtUser) {
        return !isAdmin(jwtUser);
    }

    public static boolean isPoster(JwtUser jwtUser, JobPosting posting) {
        return posting.getPoster().getId().equals(jwtUser.getId());
    }

    public static boolean notPoster(JwtUser jwtUser, JobPosting posting) {
        return !isPoster(jwtUser, posting);
    }

}
