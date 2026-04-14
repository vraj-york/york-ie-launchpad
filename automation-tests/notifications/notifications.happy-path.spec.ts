import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';

test.describe('Notifications — Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.notifications);
  });

  test('should show inbox and allow mark all read', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Notifications' })).toBeVisible();
    await page.getByRole('button', { name: /Mark all read/i }).click();
    await expect(page.getByText(/new/)).toHaveCount(0);
  });

  test('should open notification settings view', async ({ page }) => {
    await page.getByRole('button', { name: /Notification Settings/i }).click();
    await expect(page.getByText(/Task is "Next" in workflow/i)).toBeVisible();
  });
});
