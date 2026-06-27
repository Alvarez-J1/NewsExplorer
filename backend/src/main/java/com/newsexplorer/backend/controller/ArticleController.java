package com.newsexplorer.backend.controller;

import com.newsexplorer.backend.dto.ArticleRequest;
import com.newsexplorer.backend.dto.ArticleResponse;
import com.newsexplorer.backend.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    /**
     * GET /articles
     * Header: Authorization: Bearer <token>
     * Response 200: [ { "_id": "...", "url": "...", ... }, ... ]
     */
    @GetMapping
    public List<ArticleResponse> getSavedArticles(@AuthenticationPrincipal UserDetails userDetails) {
        return articleService.getSavedArticles(userDetails.getUsername());
    }

    /**
     * POST /articles
     * Header: Authorization: Bearer <token>
     * Body: { "url": "...", "title": "...", "description": "...", "urlToImage": "...",
     *          "publishedAt": "...", "source": "...", "keyword": "..." }
     * Response 201: { "_id": "...", "url": "...", ... }
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ArticleResponse saveArticle(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ArticleRequest request
    ) {
        return articleService.saveArticle(userDetails.getUsername(), request);
    }

    /**
     * DELETE /articles/{id}
     * Header: Authorization: Bearer <token>
     * Response 200: { "message": "Article deleted successfully" }
     */
    @DeleteMapping("/{id}")
    public Map<String, String> deleteArticle(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String id
    ) {
        articleService.deleteArticle(userDetails.getUsername(), id);
        return Map.of("message", "Article deleted successfully");
    }
}
