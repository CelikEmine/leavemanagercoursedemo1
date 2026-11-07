package com.company.leavemanager.readiness;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

@Tag("unit")
class ReadinessControllerTest {

  @Test
  void reportsReadyWhenDatabaseIsAvailable() {
    ReadinessService service = mock(ReadinessService.class);
    when(service.isDatabaseReady()).thenReturn(true);

    var response = new ReadinessController(service).getReadiness();

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals("ready", response.getBody().status());
  }

  @Test
  void reportsUnavailableWhenDatabaseIsUnavailable() {
    ReadinessService service = mock(ReadinessService.class);
    when(service.isDatabaseReady()).thenReturn(false);

    var response = new ReadinessController(service).getReadiness();

    assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
    assertEquals("unavailable", response.getBody().status());
  }
}
