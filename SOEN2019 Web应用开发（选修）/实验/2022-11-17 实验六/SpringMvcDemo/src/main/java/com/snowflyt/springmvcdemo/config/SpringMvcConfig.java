package com.snowflyt.springmvcdemo.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.snowflyt.springmvcdemo.controller"})
public class SpringMvcConfig {
}
