package com.newsexplorer.backend.dto;

import com.newsexplorer.backend.entity.User;

/**
 * Returned by POST /signin.
 * Shape: { "token": "...", "data": { "_id": "...", "name": "...", "email": "..." } }
 */
public record AuthResponse(String token, UserResponse.UserData data) {

    public static AuthResponse from(String token, User user) {
        return new AuthResponse(
                token,
                new UserResponse.UserData(user.getId(), user.getName(), user.getEmail())
        );
    }
}
