package com.snowflyt.jobposting.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.snowflyt.jobposting.dto.JwtUser;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@Slf4j
public class JwtUtil {

    // token expiration time
    private static final long EXPIRE_TIME = 24 * 60 * 60 * 1000L; // 1 day

    private static final String CLAIM_KEY_USERID = "userId";

    private static final String CLAIM_KEY_USERNAME = "username";

    private static final String CLAIM_KEY_ROLES = "roles";

    private static final String JWT_SECRET = "1eb5465b-f01a-4c58-95ae-6bf8c7dd1f2c";

    private JwtUtil() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * create jwt token by jwtUser
     */
    public static String createJwtTokenByJwtUser(JwtUser jwtUser) {
        var expiredAt = new Date(System.currentTimeMillis() + EXPIRE_TIME);
        var algorithm = Algorithm.HMAC256(JWT_SECRET);
        // jwt token with username, roles and expiration time
        return JWT.create()
                .withClaim(CLAIM_KEY_USERID, jwtUser.getId())
                .withClaim(CLAIM_KEY_USERNAME, jwtUser.getUsername())
                .withClaim(CLAIM_KEY_ROLES, jwtUser.getRoles())
                .withExpiresAt(expiredAt)
                .sign(algorithm);
    }

    /**
     * verify whether the token is valid
     * if no exception is thrown, the token is valid
     */
    public static boolean verifyTokenOfUser(String token) throws TokenExpiredException {
        // user must be obtained from securityManager
        // to ensure that the user is using his own token
        log.info("verifying token of user...");

        // generate a jwt verifier with the secret key
        var algorithm = Algorithm.HMAC256(JWT_SECRET);
        var verifier = JWT.require(algorithm)
                // get username from unencrypted claim
                .withClaim(CLAIM_KEY_USERNAME, getUsername(token))
                .build();

        // verify token
        verifier.verify(token);
        // If no exception is thrown, the token is valid
        return true;
    }

    /**
     * get username from jwt token claims
     */
    public static String getUsername(String token) {
        try {
            var jwt = JWT.decode(token);
            return jwt.getClaim(CLAIM_KEY_USERNAME).asString();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    public static JwtUser recreateJwtUserFromToken(String token) {
        var jwt = JWT.decode(token);

        var userId = jwt.getClaim(CLAIM_KEY_USERID).asLong();
        var username = jwt.getClaim(CLAIM_KEY_USERNAME).asString();
        var roleNames = jwt.getClaim(CLAIM_KEY_ROLES).asList(String.class);

        return new JwtUser(userId, username, roleNames);
    }

}
