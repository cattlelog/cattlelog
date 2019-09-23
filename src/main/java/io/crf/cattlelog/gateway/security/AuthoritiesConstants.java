package io.crf.cattlelog.gateway.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
    
    public static final String CONSULTANT = "ROLE_CONSULTANT";
    
//    public static final String PROVIDER = "ROLE_PROVIDER";
    
//    public static final String SHIP = "ROLE_SHIP";
    
    public static final String ASSOCIATION = "ROLE_ASSOCIATION";

    private AuthoritiesConstants() {
    }
}
