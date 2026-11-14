package com.company.leavemanager.readiness;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReadinessController {

  private final ReadinessService readinessService;

  public ReadinessController(ReadinessService readinessService) {
    this.readinessService = readinessService;
  }

  @GetMapping("/api/readiness")
  public ResponseEntity<ReadinessResponse> getReadiness() {
    boolean ready = readinessService.isDatabaseReady();
    ReadinessResponse response = new ReadinessResponse(ready ? "ready" : "unavailable");
    return ResponseEntity.status(ready ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE)
        .body(response);
  }
}
