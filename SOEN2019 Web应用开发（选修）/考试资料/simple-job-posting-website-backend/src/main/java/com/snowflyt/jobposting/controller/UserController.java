package com.snowflyt.jobposting.controller;

import com.snowflyt.jobposting.aspect.RequireAdmin;
import com.snowflyt.jobposting.dto.JwtUser;
import com.snowflyt.jobposting.dto.info.RoleDto;
import com.snowflyt.jobposting.dto.info.UserDto;
import com.snowflyt.jobposting.dto.request.LoginRequest;
import com.snowflyt.jobposting.dto.request.PasswordUpdateRequest;
import com.snowflyt.jobposting.dto.request.UserCreationRequest;
import com.snowflyt.jobposting.dto.response.LoginResponse;
import com.snowflyt.jobposting.entity.account.Role;
import com.snowflyt.jobposting.entity.account.User;
import com.snowflyt.jobposting.exception.RoleNotFoundException;
import com.snowflyt.jobposting.exception.UserAlreadyExistsException;
import com.snowflyt.jobposting.exception.UserNotFoundException;
import com.snowflyt.jobposting.service.UserService;
import com.snowflyt.jobposting.util.AuthUtil;
import com.snowflyt.jobposting.util.JwtUtil;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get all roles (only for admin).
     */
    @GetMapping("/roles")
    @RequireAdmin
    public List<RoleDto> getAllRoles() {
        return userService.findAllRoles().stream()
                .map(Role::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get all users (only for admin).
     */
    @GetMapping("/users")
    @RequireAdmin
    public List<UserDto> getAllUsersInfo() {
        var users = userService.findAllUser();

        return users.stream()
                .map(User::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get current user info.
     */
    @GetMapping("/user/me")
    public UserDto getCurrentUserInfo() {
        var jwtUser = AuthUtil.getJwtUserFromSecurityManager();
        var user = userService.findUserById(jwtUser.getId())
                .orElseThrow(UserNotFoundException::new);
        return user.toDto();
    }

    /**
     * Get a user (only for admin and user himself).
     */
    @GetMapping("/user/{id}")
    public UserDto getUserInfo(@PathVariable Long id) {
        var jwtUser = AuthUtil.getJwtUserFromSecurityManager();

        var user = userService.findUserByUsername(jwtUser.getUsername())
                .orElseThrow(UserNotFoundException::new);

        // only admin and user himself can get info of a user
        if (AuthUtil.isAdmin(jwtUser) && !user.getId().equals(id)) {
            throw new UnauthorizedException();
        }

        return user.toDto();
    }

    /**
     * Delete a user (only for admin).
     */
    @DeleteMapping("/user/{id}")
    @RequireAdmin
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUserByUserId(id);
    }

    /**
     * Change the password of a user (only for admin and user himself).
     */
    @PutMapping("/user/{id}/password")
    public void changePassword(
            @PathVariable Long id,
            @RequestBody PasswordUpdateRequest request) {
        var jwtUser = AuthUtil.getJwtUserFromSecurityManager();

        var user = userService.findUserByUsername(jwtUser.getUsername())
                .orElseThrow(UserNotFoundException::new);

        // only admin and user himself can change password
        if (AuthUtil.isAdmin(jwtUser) && !user.getId().equals(id)) {
            throw new UnauthorizedException();
        }

        String salt = new SecureRandomNumberGenerator().nextBytes().toString();
        String encodedPassword = new Md5Hash(request.getPassword(), salt, 2).toString();
        user.setPassword(encodedPassword);
        user.setSalt(salt);

        userService.saveUser(user);
    }

    /**
     * Login by username and password (no need for token).
     */
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login succeed"),
            @ApiResponse(responseCode = "403", description = "User not exist or password incorrect", content = @Content)
    })
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        var username = loginRequest.getUsername();
        var password = loginRequest.getPassword();

        Assert.notNull(username, "username cannot be null");
        Assert.notNull(password, "password cannot be null");

        var usernamePasswordToken = new UsernamePasswordToken(username, password);
        var subject = SecurityUtils.getSubject();
        subject.login(usernamePasswordToken);

        var jwtUser = (JwtUser) SecurityUtils.getSubject().getPrincipal();

        var token = JwtUtil.createJwtTokenByJwtUser(jwtUser);

        var user = userService.findUserByUsername(username).orElseThrow(UserNotFoundException::new);

        return LoginResponse.from(token, user);
    }

    /**
     * Register a new user (no need for token).
     */
    @ApiResponse(responseCode = "200")
    @ApiResponse(responseCode = "409", description = "Conflict username", content = @Content)
    @PostMapping("/register")
    public UserDto register(@RequestBody UserCreationRequest userCreationRequest) {
        var username = userCreationRequest.getUsername();
        var password = userCreationRequest.getPassword();
        var phone = userCreationRequest.getPhone();
        var email = userCreationRequest.getEmail();

        Assert.notNull(username, "Username cannot be null");
        Assert.notNull(password, "Password cannot be null");
        Assert.notNull(phone, "Phone cannot be null");
        Assert.notNull(email, "Email cannot be null");

        if (userService.findUserByUsername(username).isPresent()) {
            throw new UserAlreadyExistsException();
        }

        var salt = new SecureRandomNumberGenerator().nextBytes().toString();
        var encodedPassword = new Md5Hash(password, salt, 2).toString();

        var roles = List.of(userService.findRoleByName("user")
                .orElseThrow(RoleNotFoundException::new));

        var user = userService.saveUser(User.builder()
                .username(username)
                .password(encodedPassword)
                .salt(salt)
                .roles(roles)
                .phone(phone)
                .email(email)
                .build());

        return user.toDto();
    }

}
