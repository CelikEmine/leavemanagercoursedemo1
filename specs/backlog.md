# Backlog — deferred findings

Findings a human triaged as **defer**: real, but fixed later by decision (`workflows/feature-development.md`,
step 7). Nothing lands here without that decision; noise is rejected in the triage record, not parked here.

- A criterion moved out at the ship gate (R-08, `→ moved to B-<n>`) lands here too, by the
  human's ship decision; the entry names the spec and criterion.
- One entry per finding, newest last. Delete the entry in the commit of the work that closes it.
- An entry that grows into new behavior becomes a spec (`specs/active/`), not a fix.

<!-- Format (labels stay English):
- **B-<n>** — <finding, one line> — Source: spec <NNNN>, review round <n> (<file:line>) — Severity: <…>
  — Recommendation: <the reviewer's action> — Deferred by: <name>, <YYYY-MM-DD>, <why>
  A decision deferred at bootstrap (its REPORT) uses Source: bootstrap <YYYY-MM-DD>.
-->

- **B-1** — Define module boundaries and forbidden dependencies — Source: bootstrap 2026-11-07
  — Severity: design decision — Recommendation: decide module ownership and testable dependency
  rules in the walking-skeleton plan — Deferred by: user, 2026-11-07, requested to decide later.
- **B-2** — CI residue step re-runs the full check twice on every push/PR, tripling CI time —
  Source: spec 0001, review round 1 (`.github/workflows/check.yml:61`) — Severity: Low —
  Recommendation: run residue only when `scripts/check.conf` changes (paths filter or separate
  job), per `docs/testing.md` — Deferred by: Emine Çelik, 2026-11-14, CI cost, not correctness.
- **B-3** — Vite proxy and Playwright webServer URL hardcode backend port 8080 while the backend
  honours `PORT` — Source: spec 0001, review round 1 (`frontend/vite.config.ts:8`) — Severity: Low
  — Recommendation: derive both from one backend-port variable — Deferred by: Emine Çelik,
  2026-11-14, `PORT` override is not a documented workflow.
- **B-4** — Playwright webServer `./mvnw` cannot start under cmd on Windows — Source: spec 0001,
  review round 1 (`frontend/playwright.config.ts:20`) — Severity: Low — Recommendation: choose
  `mvnw.cmd` on win32 — Deferred by: Emine Çelik, 2026-11-14, E2E is CI-only by A-1.
