package com.snowflyt.jobposting.realm;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.snowflyt.jobposting.dto.JwtUser;
import com.snowflyt.jobposting.service.UserService;
import com.snowflyt.jobposting.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
@Component
public class TokenValidateAndAuthorizingRealm extends AuthorizingRealm {

    private final Map<String, Set<String>> rolePermissionNamesMap;

    public TokenValidateAndAuthorizingRealm(UserService userService) {
        // custom CredentialsMatcher: JwtCredentialsMatcher
        super((authenticationToken, authenticationInfo) -> {
            var bearerToken = (BearerToken) authenticationToken;
            var bearerTokenString = bearerToken.getToken();
            return JwtUtil.verifyTokenOfUser(bearerTokenString);
        });

        rolePermissionNamesMap = userService.getRolePermissionNamesMap();
    }

    @Override
    public String getName() {
        return "TokenValidateAndAuthorizingRealm";
    }

    @Override
    public Class<?> getAuthenticationTokenClass() {
        // set the token type that this realm can handle
        // BearerToken is automatically assembled in the filter
        return BearerToken.class;
    }

    @Override
    public boolean supports(AuthenticationToken token) {
        var result = super.supports(token);
        log.debug("[TokenValidateRealm supported] " + result);
        return result;
    }

    @Override // assemble user information for Matcher to call
    public AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken)
            throws AuthenticationException, TokenExpiredException {
        var bearerToken = (BearerToken) authenticationToken;
        var bearerTokenString = bearerToken.getToken();

        var jwtUser = JwtUtil.recreateJwtUserFromToken(bearerTokenString);

        return new SimpleAuthenticationInfo(jwtUser, bearerTokenString, getName());
    }

    @Override // authorization management
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        var jwtUser = (JwtUser) SecurityUtils.getSubject().getPrincipal();

        var simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addRoles(jwtUser.getRoles()); // add roles to token

        Set<String> stringPermissions = new HashSet<>();
        for (var role : jwtUser.getRoles()) {
            stringPermissions.addAll(rolePermissionNamesMap.get(role));
        }
        simpleAuthorizationInfo.addStringPermissions(stringPermissions);
        return simpleAuthorizationInfo;
    }

}
