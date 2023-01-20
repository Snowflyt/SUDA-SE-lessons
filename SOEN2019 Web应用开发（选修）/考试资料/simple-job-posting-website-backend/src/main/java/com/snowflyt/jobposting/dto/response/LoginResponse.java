package com.snowflyt.jobposting.dto.response;

import com.snowflyt.jobposting.entity.account.Role;
import com.snowflyt.jobposting.entity.account.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String token;

    private Long userId;

    private String username;

    private String email;

    private String address;

    private List<String> roles;

    public static LoginResponse from(String token, User user) {
        return new LoginResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toList())
        );
    }

}
