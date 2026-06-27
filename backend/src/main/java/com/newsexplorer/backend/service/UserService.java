package com.newsexplorer.backend.service;

import com.newsexplorer.backend.dto.UserResponse;
import com.newsexplorer.backend.entity.User;
import com.newsexplorer.backend.exception.ResourceNotFoundException;
import com.newsexplorer.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /** Look up a user by email and return the response DTO. */
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserResponse.from(user);
    }
}
