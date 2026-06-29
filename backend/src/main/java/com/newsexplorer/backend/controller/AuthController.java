package com.newsexplorer.backend.controller;

import com.newsexplorer.backend.dto.AuthResponse;
import com.newsexplorer.backend.dto.SignInRequest;
import com.newsexplorer.backend.dto.SignUpRequest;
import com.newsexplorer.backend.dto.UserResponse;
import com.newsexplorer.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * POST /signup
     * Body: { "email": "...", "password": "...", "name": "..." }
     * Response 201: { "data": { "_id": "...", "name": "...", "email": "..." } }
     */
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse signup(@Valid @RequestBody SignUpRequest request) {
        return authService.register(request);
    }

    /**
     * POST /signin
     * Body: { "email": "...", "password": "..." }
     * Response 200: { "token": "...", "data": { "_id": "...", "name": "...", "email": "..." } }
     */
    @PostMapping("/signin")
    public AuthResponse signin(@Valid @RequestBody SignInRequest request) {
        return authService.login(request);
    }

    /**
     * POST /signin/demo
     * Response 200: { "token": "...", "data": { "_id": "...", "name": "...", "email": "..." } }
     */
    @PostMapping("/signin/demo")
    public AuthResponse signinDemo() {
        return authService.loginDemo();
    }
}
