package com.newsexplorer.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.newsexplorer.backend.entity.User;

/**
 * Returned by GET /users/me.
 * Shape: { "data": { "_id": "...", "name": "...", "email": "..." } }
 *
 * The frontend destructures: const { data: user } = await checkToken(token)
 */
public record UserResponse(UserData data) {

    public record UserData(
            @JsonProperty("_id") String id,
            String name,
            String email
    ) {}

    public static UserResponse from(User user) {
        return new UserResponse(new UserData(user.getId(), user.getName(), user.getEmail()));
    }
}
