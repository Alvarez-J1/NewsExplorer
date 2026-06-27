package com.newsexplorer.backend.service;

import com.newsexplorer.backend.dto.ArticleRequest;
import com.newsexplorer.backend.dto.ArticleResponse;
import com.newsexplorer.backend.entity.Article;
import com.newsexplorer.backend.entity.User;
import com.newsexplorer.backend.exception.ConflictException;
import com.newsexplorer.backend.exception.ResourceNotFoundException;
import com.newsexplorer.backend.exception.UnauthorizedException;
import com.newsexplorer.backend.repository.ArticleRepository;
import com.newsexplorer.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    /** Return all articles saved by the authenticated user. */
    public List<ArticleResponse> getSavedArticles(String email) {
        User user = findUserByEmail(email);
        return articleRepository.findByOwnerId(user.getId())
                .stream()
                .map(ArticleResponse::from)
                .toList();
    }

    /** Save a new article for the authenticated user. */
    @Transactional
    public ArticleResponse saveArticle(String email, ArticleRequest request) {
        User user = findUserByEmail(email);

        if (articleRepository.existsByUrlAndOwnerId(request.url(), user.getId())) {
            throw new ConflictException("Article already saved");
        }

        Article article = new Article();
        article.setUrl(request.url());
        article.setTitle(request.title());
        article.setDescription(request.description());
        article.setUrlToImage(request.urlToImage());
        article.setSource(request.source());
        article.setKeyword(request.keyword());

        if (request.publishedAt() != null && !request.publishedAt().isBlank()) {
            try {
                article.setPublishedAt(Instant.parse(request.publishedAt()));
            } catch (Exception e) {
                // If the date string can't be parsed as ISO-8601, store null
                article.setPublishedAt(null);
            }
        }

        article.setOwner(user);
        articleRepository.save(article);
        return ArticleResponse.from(article);
    }

    /** Delete an article by id. Only the owner may delete their own articles. */
    @Transactional
    public void deleteArticle(String email, String articleId) {
        User user = findUserByEmail(email);

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));

        if (!article.getOwner().getId().equals(user.getId())) {
            throw new UnauthorizedException("You do not have permission to delete this article");
        }

        articleRepository.delete(article);
    }

    // --- helpers ---

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
