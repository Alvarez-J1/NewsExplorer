package com.newsexplorer.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ArticleRequest(
        @NotBlank(message = "URL is required")
        String url,

        @NotBlank(message = "Title is required")
        String title,

        String description,
        String urlToImage,
        String publishedAt,
        String source,

        @NotBlank(message = "Keyword is required")
        String keyword
) {}
