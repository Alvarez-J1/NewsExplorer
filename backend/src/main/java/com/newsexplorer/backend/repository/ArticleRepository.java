package com.newsexplorer.backend.repository;

import com.newsexplorer.backend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, String> {
    List<Article> findByOwnerId(String ownerId);
    Optional<Article> findByIdAndOwnerId(String id, String ownerId);
    boolean existsByUrlAndOwnerId(String url, String ownerId);
}
