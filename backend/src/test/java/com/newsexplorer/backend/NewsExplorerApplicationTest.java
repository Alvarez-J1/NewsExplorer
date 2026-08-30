package com.newsexplorer.backend;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class NewsExplorerApplicationTest {

    @Test
    void convertsNeonStyleDatabaseUrlToJdbcSettings() {
        NewsExplorerApplication.DatabaseUrlSettings settings =
                NewsExplorerApplication.parseDatabaseUrl(
                        "postgresql://neondb_owner:pa%40ss%2Bword@ep-spring-rain-a1b2c3d4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
                );

        assertThat(settings).isNotNull();
        assertThat(settings.jdbcUrl())
                .isEqualTo("jdbc:postgresql://ep-spring-rain-a1b2c3d4.us-east-2.aws.neon.tech/neondb?sslmode=require&channelBinding=require");
        assertThat(settings.username()).isEqualTo("neondb_owner");
        assertThat(settings.password()).isEqualTo("pa@ss+word");
    }

    @Test
    void convertsRenderStyleDatabaseUrlToJdbcSettings() {
        NewsExplorerApplication.DatabaseUrlSettings settings =
                NewsExplorerApplication.parseDatabaseUrl(
                        "postgres://render_user:render_secret@dpg-example-a.oregon-postgres.render.com:5432/newsexplorer"
                );

        assertThat(settings).isNotNull();
        assertThat(settings.jdbcUrl())
                .isEqualTo("jdbc:postgresql://dpg-example-a.oregon-postgres.render.com:5432/newsexplorer");
        assertThat(settings.username()).isEqualTo("render_user");
        assertThat(settings.password()).isEqualTo("render_secret");
    }

    @Test
    void normalizesJdbcDatabaseUrlQuerySettings() {
        NewsExplorerApplication.DatabaseUrlSettings settings =
                NewsExplorerApplication.parseDatabaseUrl(
                        "jdbc:postgresql://ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&user=reader&password=s3cr%2Bt"
                );

        assertThat(settings).isNotNull();
        assertThat(settings.jdbcUrl())
                .isEqualTo("jdbc:postgresql://ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require&channelBinding=require&user=reader&password=s3cr%2Bt");
        assertThat(settings.username()).isEqualTo("reader");
        assertThat(settings.password()).isEqualTo("s3cr+t");
    }

    @Test
    void ignoresMalformedDatabaseUrl() {
        NewsExplorerApplication.DatabaseUrlSettings settings =
                NewsExplorerApplication.parseDatabaseUrl("postgresql://%zz");

        assertThat(settings).isNull();
    }

    @Test
    void ignoresBlankDatabaseUrl() {
        NewsExplorerApplication.DatabaseUrlSettings settings =
                NewsExplorerApplication.parseDatabaseUrl("   ");

        assertThat(settings).isNull();
    }

    @Test
    void ignoresUnsupportedDatabaseUrlScheme() {
        NewsExplorerApplication.DatabaseUrlSettings settings =
                NewsExplorerApplication.parseDatabaseUrl("mysql://localhost/newsexplorer");

        assertThat(settings).isNull();
    }

    @Test
    void convertsDatabaseUrlWithUsernameOnly() {
        NewsExplorerApplication.DatabaseUrlSettings settings =
                NewsExplorerApplication.parseDatabaseUrl("postgresql://reader@localhost/newsexplorer");

        assertThat(settings).isNotNull();
        assertThat(settings.jdbcUrl()).isEqualTo("jdbc:postgresql://localhost/newsexplorer");
        assertThat(settings.username()).isEqualTo("reader");
        assertThat(settings.password()).isNull();
    }
}
