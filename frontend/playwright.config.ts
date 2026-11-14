import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from '@playwright/test';

const frontendDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryDirectory = path.resolve(frontendDirectory, '..');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    headless: true,
    reducedMotion: 'reduce',
  },
  webServer: [
    {
      command: './mvnw -B -ntp spring-boot:run',
      cwd: repositoryDirectory,
      url: 'http://127.0.0.1:8080/api/readiness',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'npm run dev -- --port 5173 --strictPort',
      cwd: frontendDirectory,
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
  ],
});
