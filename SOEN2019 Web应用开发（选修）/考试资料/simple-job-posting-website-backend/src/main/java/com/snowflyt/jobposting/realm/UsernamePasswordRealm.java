package com.snowflyt.jobposting.realm;

import com.snowflyt.jobposting.dto.JwtUser;
import com.snowflyt.jobposting.entity.account.Role;
import com.snowflyt.jobposting.exception.UserNotFoundException;
import com.snowflyt.jobposting.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

/*
 * used to check if the username and password is valid on logging in
 */
@Slf4j
@Component
public class UsernamePasswordRealm extends AuthenticatingRealm {

    private final UserService userService;

    public UsernamePasswordRealm(UserService userService) {
        super();

        // configure credentials matcher in constructor
        var hashedCredentialsMatcher = new HashedCredentialsMatcher();
        // use twice md5 to encrypt password
        hashedCredentialsMatcher.setHashAlgorithmName("md5");
        hashedCredentialsMatcher.setHashIterations(2);
        this.setCredentialsMatcher(hashedCredentialsMatcher);

        this.userService = userService;
    }

    /**
     * judge whether which token can be used by this realm (only UsernamePasswordToken)
     */
    @Override
    public Class<?> getAuthenticationTokenClass() {
        log.info("getAuthenticationTokenClass");
        return UsernamePasswordToken.class;
    }

    @Override
    public boolean supports(AuthenticationToken token) {
        var result = super.supports(token);
        log.debug("[TokenValidateRealm supported] " + result);
        return result;
    }

    /**
     * authenticate username and password (only for login)
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) {
        var usernamePasswordToken = (UsernamePasswordToken) token;

        var user = userService.findUserByUsername(usernamePasswordToken.getUsername())
                .orElseThrow(UserNotFoundException::new);

        var jwtUser = new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getRoles().stream()
                        .map(Role::getName)
                        .distinct()
                        .collect(Collectors.toList()));

        return new SimpleAuthenticationInfo(
                jwtUser,
                user.getPassword(),
                ByteSource.Util.bytes(user.getSalt()),
                getName());
    }

}
