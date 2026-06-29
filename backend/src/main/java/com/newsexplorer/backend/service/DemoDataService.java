package com.newsexplorer.backend.service;

import com.newsexplorer.backend.entity.User;
import com.newsexplorer.backend.repository.ArticleRepository;
import com.newsexplorer.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class DemoDataService {

    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final PasswordEncoder passwordEncoder;
    private final String demoEmail;
    private final String demoPassword;
    private final String demoName;
    private static final Set<String> REMOVED_SEEDED_ARTICLE_URLS = Set.of(
            "https://www.reuters.com/world/climate-energy/",
            "https://www.theverge.com/artificial-intelligence",
            "https://apnews.com/hub/business",
            "https://www.npr.org/sections/health/"
    );

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
    public void ensureDemoAccountOnStartup() {
        User demoUser = ensureDemoAccount();
        removeRetiredSeedArticles(demoUser);
    }

    @Transactional
    public User ensureDemoAccount() {
        return userRepository.findByEmail(demoEmail)
                .orElseGet(() -> userRepository.save(new User(
                        demoEmail,
                        passwordEncoder.encode(demoPassword),
                        demoName
                )));
    }

    @Transactional(readOnly = true)
    public User getDemoAccount() {
        return userRepository.findByEmail(demoEmail)
                .orElseThrow(() -> new IllegalStateException("Demo account is not configured"));
    }

    private void removeRetiredSeedArticles(User demoUser) {
        articleRepository.findByOwnerId(demoUser.getId()).stream()
                .filter(article -> REMOVED_SEEDED_ARTICLE_URLS.contains(article.getUrl()))
                .forEach(articleRepository::delete);
    }
}
