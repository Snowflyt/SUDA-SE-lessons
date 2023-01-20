package com.snowflyt.jobposting.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OpenApiCustomiser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearer-key",
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer")
                                        .bearerFormat("JWT"))
                );
    }

    @Bean
    public OpenApiCustomiser customOpenApi() {
        return openApi -> openApi.getPaths().values().forEach(pathItem -> pathItem.readOperations().forEach(operation -> {
            // add bearer auth and responses to all operations except /login
            if (!Arrays.asList("login", "register", "job-postings").contains(operation.getOperationId())) {
                // add bearer auth
                operation.addSecurityItem(new SecurityRequirement().addList("bearer-key"));
                // add responses
                var apiResponses = operation.getResponses();
                apiResponses.get("200").description("OK");
                apiResponses.put("401", new ApiResponse().description("Unauthorized user"));
                apiResponses.put("404", new ApiResponse().description("Resource not found"));
                apiResponses.put("500", new ApiResponse().description("Token not given or invalid (expired)"));
            }
        }));
    }

}
