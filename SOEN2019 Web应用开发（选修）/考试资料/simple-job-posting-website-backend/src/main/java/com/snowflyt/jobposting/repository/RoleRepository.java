package com.snowflyt.jobposting.repository;

import com.snowflyt.jobposting.entity.account.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
    Optional<Role> findRoleByName(String roleName);
    
}
