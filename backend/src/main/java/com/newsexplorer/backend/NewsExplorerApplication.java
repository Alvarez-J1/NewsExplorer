package com.newsexplorer.backend;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NewsExplorerApplication {
    public static void main(String[] args) {
        configureDatabaseUrl();
        SpringApplication.run(NewsExplorerApplication.class, args);
    }

    private static void configureDatabaseUrl() {
        if (isConfigured("DB_URL")) {
            return;
        }

        DatabaseUrlSettings settings = parseDatabaseUrl(System.getenv("DATABASE_URL"));
        if (settings == null) {
            return;
        }

        System.setProperty("DB_URL", settings.jdbcUrl());

        if (settings.username() != null && !settings.username().isBlank()) {
            System.setProperty("DB_USERNAME", settings.username());
        }

        if (settings.password() != null) {
            System.setProperty("DB_PASSWORD", settings.password());
        }
    }

    static DatabaseUrlSettings parseDatabaseUrl(String databaseUrl) {
        if (databaseUrl == null || databaseUrl.isBlank()) {
            return null;
        }

        if (databaseUrl.startsWith("jdbc:postgresql://")) {
            QuerySettings querySettings = parseQuerySettingsFromJdbcUrl(databaseUrl);
            return new DatabaseUrlSettings(
                    normalizeJdbcUrl(databaseUrl),
                    querySettings.username(),
                    querySettings.password()
            );
        }

        if (!databaseUrl.startsWith("postgres://") && !databaseUrl.startsWith("postgresql://")) {
            return null;
        }

        URI uri = URI.create(databaseUrl.replaceFirst("^postgres://", "postgresql://"));
        String host = uri.getHost();
        String rawPath = uri.getRawPath();

        if (host == null || host.isBlank()) {
            return null;
        }

        UserInfo userInfo = parseUserInfo(uri.getRawUserInfo());
        QuerySettings querySettings = parseQuerySettings(uri.getRawQuery());

        StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://")
                .append(formatJdbcHost(host));

        if (uri.getPort() != -1) {
            jdbcUrl.append(":").append(uri.getPort());
        }

        jdbcUrl.append(rawPath == null || rawPath.isBlank() ? "/" : rawPath);

        if (!querySettings.query().isBlank()) {
            jdbcUrl.append("?").append(querySettings.query());
        }

        return new DatabaseUrlSettings(jdbcUrl.toString(), userInfo.username(), userInfo.password());
    }

    private static boolean isConfigured(String key) {
        String propertyValue = System.getProperty(key);
        if (propertyValue != null && !propertyValue.isBlank()) {
            return true;
        }

        String environmentValue = System.getenv(key);
        return environmentValue != null && !environmentValue.isBlank();
    }

    private static String normalizeJdbcUrl(String jdbcUrl) {
        int queryStart = jdbcUrl.indexOf('?');
        if (queryStart == -1) {
            return jdbcUrl;
        }

        String normalizedQuery = parseQuerySettings(jdbcUrl.substring(queryStart + 1)).query();
        return jdbcUrl.substring(0, queryStart + 1) + normalizedQuery;
    }

    private static QuerySettings parseQuerySettingsFromJdbcUrl(String jdbcUrl) {
        int queryStart = jdbcUrl.indexOf('?');
        if (queryStart == -1) {
            return new QuerySettings("", null, null);
        }

        return parseQuerySettings(jdbcUrl.substring(queryStart + 1));
    }

    private static QuerySettings parseQuerySettings(String rawQuery) {
        if (rawQuery == null || rawQuery.isBlank()) {
            return new QuerySettings("", null, null);
        }

        List<String> normalizedParts = new ArrayList<>();
        String username = null;
        String password = null;

        for (String part : rawQuery.split("&", -1)) {
            if (part.isBlank()) {
                continue;
            }

            int separator = part.indexOf('=');
            String rawKey = separator == -1 ? part : part.substring(0, separator);
            String rawValue = separator == -1 ? "" : part.substring(separator + 1);
            String normalizedKey = rawKey.equals("channel_binding") ? "channelBinding" : rawKey;

            normalizedParts.add(separator == -1 ? normalizedKey : normalizedKey + "=" + rawValue);

            if (rawKey.equals("user")) {
                username = decodeUriComponent(rawValue);
            } else if (rawKey.equals("password")) {
                password = decodeUriComponent(rawValue);
            }
        }

        return new QuerySettings(String.join("&", normalizedParts), username, password);
    }

    private static UserInfo parseUserInfo(String rawUserInfo) {
        if (rawUserInfo == null || rawUserInfo.isBlank()) {
            return new UserInfo(null, null);
        }

        int separator = rawUserInfo.indexOf(':');
        if (separator == -1) {
            return new UserInfo(decodeUriComponent(rawUserInfo), null);
        }

        return new UserInfo(
                decodeUriComponent(rawUserInfo.substring(0, separator)),
                decodeUriComponent(rawUserInfo.substring(separator + 1))
        );
    }

    private static String decodeUriComponent(String value) {
        return URLDecoder.decode(value.replace("+", "%2B"), StandardCharsets.UTF_8);
    }

    private static String formatJdbcHost(String host) {
        if (host.contains(":") && !host.startsWith("[") && !host.endsWith("]")) {
            return "[" + host + "]";
        }

        return host;
    }

    record DatabaseUrlSettings(String jdbcUrl, String username, String password) {
    }

    private record QuerySettings(String query, String username, String password) {
    }

    private record UserInfo(String username, String password) {
    }
}
