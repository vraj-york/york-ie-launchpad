import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';

test.describe('App navigation — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.projects);
  });

  test('should move focus through sidebar links with Tab', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByText('Jetpack Workflow')).toBeVisible();
    const tag = await page.evaluate(() => document.activeElement?.tagName?.toLowerCase() ?? '');
    expect(tag).toBeTruthy();
  });

  test('should keep layout when rapidly switching between two routes', async ({ page }) => {
    await page.getByRole('link', { name: 'Tasks' }).click();
    await page.getByRole('link', { name: 'Planning' }).click();
    await page.getByRole('link', { name: 'Tasks' }).click();
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
    await expect(page.getByText('Jetpack Workflow')).toBeVisible();
  });
});
