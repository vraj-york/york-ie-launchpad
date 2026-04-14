import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';

test.describe('Notifications — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.notifications);
  });

  test('should toggle between inbox and settings repeatedly', async ({ page }) => {
    await page.getByRole('button', { name: /Notification Settings/i }).click();
    await page.getByRole('button', { name: /Notification Settings/i }).click();
    await expect(page.getByRole('heading', { name: 'Notifications' })).toBeVisible();
  });
});
