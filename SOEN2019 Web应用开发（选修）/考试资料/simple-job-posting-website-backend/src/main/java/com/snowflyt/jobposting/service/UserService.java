package com.snowflyt.jobposting.service;

import com.snowflyt.jobposting.entity.account.Permission;
import com.snowflyt.jobposting.entity.account.Role;
import com.snowflyt.jobposting.entity.account.User;
import com.snowflyt.jobposting.repository.RoleRepository;
import com.snowflyt.jobposting.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    /**
     * find all roles in database
     */
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    /**
     * find all users in database
     */
    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    /**
     * find user in database by username
     */
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    /**
     * find user in database by user id
     */
    public Optional<User> findUserById(Long userId) {
        return userRepository.findById(userId);
    }

    /**
     * delete user in database by user id
     */
    @Transactional
    public void deleteUserByUserId(Long userId) {
        userRepository.deleteUserById(userId);
    }

    /**
     * find role in database by role name
     */
    public Optional<Role> findRoleByName(String name) {
        return roleRepository.findRoleByName(name);
    }

    /**
     * return the roleName-permissionName map from database
     */
    public Map<String, Set<String>> getRolePermissionNamesMap() {
        return roleRepository.findAll().stream()
                .collect(Collectors.toMap(
                        Role::getName,
                        role -> role.getPermissions().stream()
                                .map(Permission::getName)
                                .collect(Collectors.toSet())));
    }

    /**
     * save user to database
     */
    public User saveUser(User user) {
        return userRepository.save(user);
    }

}
