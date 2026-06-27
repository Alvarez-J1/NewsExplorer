package com.newsexplorer.backend.controller;

import com.newsexplorer.backend.dto.UserResponse;
import com.newsexplorer.backend.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * GET /users/me
     * Header: Authorization: Bearer <token>
     * Response 200: { "data": { "_id": "...", "name": "...", "email": "..." } }
     */
    @GetMapping("/me")
    public UserResponse getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.getUserByEmail(userDetails.getUsername());
    }
}
