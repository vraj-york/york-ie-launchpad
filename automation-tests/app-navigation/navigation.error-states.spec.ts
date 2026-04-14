import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';

test.describe('App navigation — Error States', () => {
  test('should not crash when visiting an unknown path under the app host', async ({ page }) => {
    await page.goto('/this-route-is-not-defined');
    // Unmatched routes render without the main layout; the app shell still mounts.
    await expect(page.locator('#root')).toBeAttached();
  });

  test('should still render shell after returning from unknown path to projects', async ({ page }) => {
    await page.goto('/undefined-route-xyz');
    await page.goto(ROUTES.projects);
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
  });
});
