package dev.knis.garden.service;

import dev.knis.garden.model.User;
import dev.knis.garden.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean validateLogin(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null) return false;

        return user.getPassword().equals(password);
    }
}
