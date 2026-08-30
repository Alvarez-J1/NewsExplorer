package com.newsexplorer.backend.controller;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    private static final CacheControl NO_STORE = CacheControl.noStore();

    @GetMapping({"/health", "/api/health"})
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity
                .ok()
                .cacheControl(NO_STORE)
                .body(Map.of("status", "ok"));
    }

    @RequestMapping(value = {"/health", "/api/health"}, method = RequestMethod.HEAD)
    public ResponseEntity<Void> healthHead() {
        return ResponseEntity
                .ok()
                .cacheControl(NO_STORE)
                .build();
    }
}
