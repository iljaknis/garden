package dev.knis.garden.repository;

import dev.knis.garden.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    private static final User STATIC_USER = new User("admin", "test321");

    public User findByUsername(String username) {
        if (STATIC_USER.getUsername().equals(username)) {
            return STATIC_USER;
        }
        return null;
    }
}
