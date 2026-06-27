package com.newsexplorer.backend.dto;

/**
 * Returned by POST /signin.
 * Shape: { "token": "..." }
 */
public record AuthResponse(String token) {}
