package com.company.leavemanager.readiness;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.jdbc.core.JdbcTemplate;

@Tag("unit")
class ReadinessServiceTest {

  private final JdbcTemplate jdbcTemplate = mock(JdbcTemplate.class);
  private final ReadinessService readinessService = new ReadinessService(jdbcTemplate);

  @Test
  void reportsReadyWhenDatabaseIsAvailable() {
    when(jdbcTemplate.queryForObject("SELECT 1", Integer.class)).thenReturn(1);

    assertTrue(readinessService.isDatabaseReady());
  }

  @Test
  void reportsUnavailableWhenDatabaseIsUnavailable() {
    when(jdbcTemplate.queryForObject("SELECT 1", Integer.class))
        .thenThrow(new DataAccessResourceFailureException("database unavailable"));

    assertFalse(readinessService.isDatabaseReady());
  }
}
