package com.snowflyt.jobposting.aspect;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Check if the user is admin or the user is the poster himself
 * <p>
 * WARNING: The first parameter of the method must be the id of the job posting
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RequireAdminOrPosterHimself {
}
