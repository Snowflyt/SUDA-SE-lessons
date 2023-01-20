package com.snowflyt.jobposting.repository;

import com.snowflyt.jobposting.entity.account.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String username);

    void deleteUserById(Long userId);

}
