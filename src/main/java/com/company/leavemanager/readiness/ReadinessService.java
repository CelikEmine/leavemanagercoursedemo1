package com.company.leavemanager.readiness;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class ReadinessService {

  private static final Logger LOGGER = LoggerFactory.getLogger(ReadinessService.class);
  private final JdbcTemplate jdbcTemplate;

  public ReadinessService(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public boolean isDatabaseReady() {
    try {
      return Integer.valueOf(1).equals(jdbcTemplate.queryForObject("SELECT 1", Integer.class));
    } catch (DataAccessException failure) {
      LOGGER.warn("Database readiness probe failed: {}", failure.getClass().getSimpleName());
      return false;
    }
  }
}
