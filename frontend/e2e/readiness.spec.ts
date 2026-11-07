import { expect, test } from '@playwright/test';

test('showsReadyAndUnavailableStates', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Leave Manager' })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText(
    'Backend ve veritabanı hazır.',
  );

  await page.route('**/api/readiness', (route) => route.abort());
  await page.reload();
  await expect(page.getByRole('status')).toHaveText(
    'Backend veya veritabanı kullanılamıyor.',
  );
});
