package com.snowflyt.jobposting.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * DTO for unencrypted user information in JWT token (claims)
 * only contains username and roles
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtUser {

    @NotNull
    private Long id;

    @NotNull
    private String username;

    @NotNull
    private List<String> roles;

}
