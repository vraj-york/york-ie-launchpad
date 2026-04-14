import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';

test.describe('AI Agents — Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.aiAgents);
  });

  test('should show hub metrics and activity list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'AI Agents' })).toBeVisible();
    await expect(page.getByText(/Running Now/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: "Today's Activity" })).toBeVisible();
  });

  test('should open configure agent modal', async ({ page }) => {
    await page.getByRole('button', { name: /Configure Agent Task/i }).click();
    await expect(page.getByRole('heading', { name: /Configure Agent Task/i })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
  });
});
