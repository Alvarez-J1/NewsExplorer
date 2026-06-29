package com.newsexplorer.backend.service;

import com.newsexplorer.backend.dto.AuthResponse;
import com.newsexplorer.backend.dto.SignInRequest;
import com.newsexplorer.backend.dto.SignUpRequest;
import com.newsexplorer.backend.dto.UserResponse;
import com.newsexplorer.backend.entity.User;
import com.newsexplorer.backend.exception.ConflictException;
import com.newsexplorer.backend.exception.UnauthorizedException;
import com.newsexplorer.backend.repository.UserRepository;
import com.newsexplorer.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final DemoDataService demoDataService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            DemoDataService demoDataService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.demoDataService = demoDataService;
    }

    /**
     * Register a new user. Throws ConflictException if the email is already taken.
     */
    @Transactional
    public UserResponse register(SignUpRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ConflictException("An account with this email already exists");
        }

        User user = new User(
                request.email(),
                passwordEncoder.encode(request.password()),
                request.name()
        );

        userRepository.save(user);
        return UserResponse.from(user);
    }

    /**
     * Authenticate a user and return a JWT. Throws UnauthorizedException on bad credentials.
     */
    public AuthResponse login(SignInRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());
        return AuthResponse.from(token, user);
    }

    /**
     * Authenticate recruiters into the seeded demo account using the normal JWT flow.
     */
    public AuthResponse loginDemo() {
        User demoUser = demoDataService.getDemoAccount();
        String token = jwtService.generateToken(demoUser.getEmail());
        return AuthResponse.from(token, demoUser);
    }
}
