package com.newsexplorer.backend.service;

import com.newsexplorer.backend.entity.Article;
import com.newsexplorer.backend.entity.User;
import com.newsexplorer.backend.repository.ArticleRepository;
import com.newsexplorer.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class DemoDataService {

    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final PasswordEncoder passwordEncoder;
    private final String demoEmail;
    private final String demoPassword;
    private final String demoName;

    public DemoDataService(
            UserRepository userRepository,
            ArticleRepository articleRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.demo.email}") String demoEmail,
            @Value("${app.demo.password}") String demoPassword,
            @Value("${app.demo.name}") String demoName
    ) {
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
        this.passwordEncoder = passwordEncoder;
        this.demoEmail = demoEmail;
        this.demoPassword = demoPassword;
        this.demoName = demoName;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void seedDemoDataOnStartup() {
        ensureDemoAccount();
    }

    @Transactional
    public User ensureDemoAccount() {
        User demoUser = userRepository.findByEmail(demoEmail)
                .orElseGet(() -> userRepository.save(new User(
                        demoEmail,
                        passwordEncoder.encode(demoPassword),
                        demoName
                )));

        for (DemoArticle demoArticle : demoArticles()) {
            if (!articleRepository.existsByUrlAndOwnerId(demoArticle.url(), demoUser.getId())) {
                Article article = new Article();
                article.setUrl(demoArticle.url());
                article.setTitle(demoArticle.title());
                article.setDescription(demoArticle.description());
                article.setUrlToImage(demoArticle.urlToImage());
                article.setPublishedAt(Instant.parse(demoArticle.publishedAt()));
                article.setSource(demoArticle.source());
                article.setKeyword(demoArticle.keyword());
                article.setOwner(demoUser);
                articleRepository.save(article);
            }
        }

        return demoUser;
    }

    private List<DemoArticle> demoArticles() {
        return List.of(
                new DemoArticle(
                        "https://www.reuters.com/world/climate-energy/",
                        "Cities Test New Heat Plans as Summers Grow More Extreme",
                        "Urban officials are expanding cooling centers, shade corridors, and emergency alerts as record heat reshapes public health planning.",
                        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
                        "2026-06-11T14:30:00Z",
                        "Reuters",
                        "Climate"
                ),
                new DemoArticle(
                        "https://www.theverge.com/artificial-intelligence",
                        "AI Tools Move From Novelty to Everyday Newsroom Workflow",
                        "Editors are adopting assistive AI for transcription, research triage, and archive search while keeping human review at the center.",
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
                        "2026-06-08T10:15:00Z",
                        "The Verge",
                        "Technology"
                ),
                new DemoArticle(
                        "https://apnews.com/hub/business",
                        "Small Businesses Rework Supply Chains for Faster Delivery",
                        "Regional suppliers and smarter inventory planning are helping independent businesses reduce delays and protect margins.",
                        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
                        "2026-06-03T16:45:00Z",
                        "Associated Press",
                        "Business"
                ),
                new DemoArticle(
                        "https://www.npr.org/sections/health/",
                        "Hospitals Expand Virtual Care for Rural Patients",
                        "Health systems are pairing telehealth visits with local clinics to improve specialist access outside major metro areas.",
                        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
                        "2026-05-29T12:00:00Z",
                        "NPR",
                        "Health"
                )
        );
    }

    private record DemoArticle(
            String url,
            String title,
            String description,
            String urlToImage,
            String publishedAt,
            String source,
            String keyword
    ) {}
}
