package com.snowflyt.jobposting.config;

import com.snowflyt.jobposting.filter.CorsFilter;
import com.snowflyt.jobposting.filter.JwtFilter;
import org.apache.shiro.authz.Authorizer;
import org.apache.shiro.authz.ModularRealmAuthorizer;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
public class ShiroConfig {

    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager) {
        var factoryBean = new ShiroFilterFactoryBean();

        // configure custom filter
        Map<String, Filter> filterMap = new LinkedHashMap<>();
        filterMap.put("cors", new CorsFilter()); // used to solve CORS problem
        filterMap.put("jwt", new JwtFilter()); // process token expiration
        factoryBean.setFilters(filterMap);

        // configure custom filter rules
        Map<String, String> filterRuleMap = new LinkedHashMap<>();
        filterRuleMap.put("/api-docs/**", "anon");
        filterRuleMap.put("/swagger-ui/**", "anon");
        filterRuleMap.put("/static/*", "anon");
        filterRuleMap.put("/error", "anon");
        filterRuleMap.put("/login", "anon");
        filterRuleMap.put("/register", "anon");
        filterRuleMap.put("/job-postings", "anon");
        filterRuleMap.put("/**", "jwt");

        // change project to no-session mode and add CORS filter to all requests
        factoryBean.setGlobalFilters(Arrays.asList("cors", "noSessionCreation"));

        factoryBean.setSecurityManager(securityManager);
        factoryBean.setFilterChainDefinitionMap(filterRuleMap);

        return factoryBean;
    }

    @Bean
    protected Authorizer authorizer() {
        return new ModularRealmAuthorizer();
    }

    /**
     * used to solve a *fucking* stupid conflict between spring data jpa and shiro
     * I don't know the actual logic behind it, but it works.
     */
    @Bean
    public static DefaultAdvisorAutoProxyCreator getDefaultAdvisorAutoProxyCreator() {
        var defaultAdvisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        defaultAdvisorAutoProxyCreator.setUsePrefix(true);

        return defaultAdvisorAutoProxyCreator;
    }

}
