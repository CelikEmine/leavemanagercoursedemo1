package com.company.leavemanager.readiness;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@Tag("integration")
@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
    properties = {
      "spring.datasource.url=jdbc:postgresql://127.0.0.1:1/unavailable",
      "spring.datasource.username=unused",
      "spring.datasource.password=",
      "spring.datasource.hikari.initialization-fail-timeout=-1",
      "spring.datasource.hikari.connection-timeout=1000"
    })
class ReadinessUnavailableIntegrationTest {

  @LocalServerPort private int port;

  @Test
  void reportsUnavailableWhenDatabaseIsUnavailable() throws IOException, InterruptedException {
    HttpRequest request =
        HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + port + "/api/readiness"))
            .GET()
            .build();

    HttpResponse<String> response =
        HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

    assertEquals(503, response.statusCode());
    assertEquals("{\"status\":\"unavailable\"}", response.body());
  }
}
