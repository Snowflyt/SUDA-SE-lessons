package com.snowflyt.jobposting.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for register request in UserController
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreationRequest {

    private String username;

    private String password;

    private String phone;

    private String email;

}
