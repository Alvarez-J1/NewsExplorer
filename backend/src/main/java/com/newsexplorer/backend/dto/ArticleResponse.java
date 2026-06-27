package com.newsexplorer.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.newsexplorer.backend.entity.Article;

/**
 * Returned by GET /articles (in a list) and POST /articles.
 * Field names mirror the NewsAPI / frontend adapter expectations.
 */
public record ArticleResponse(
        @JsonProperty("_id") String id,
        String url,
        String title,
        String description,
        String urlToImage,
        String publishedAt,
        String source,
        String keyword
) {
    public static ArticleResponse from(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getUrl(),
                article.getTitle(),
                article.getDescription(),
                article.getUrlToImage(),
                article.getPublishedAt() != null ? article.getPublishedAt().toString() : null,
                article.getSource(),
                article.getKeyword()
        );
    }
}
