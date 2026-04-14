import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, INVALID_INPUTS } from '../helpers/test-data';

test.describe('Tasks — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.tasks);
  });

  test('should show no rows when search has no matches', async ({ page }) => {
    const search = page.locator('main').getByPlaceholder(/Search tasks/i);
    await search.scrollIntoViewIfNeeded();
    await search.fill('__no_such_task_zz__', { force: true });
    await expect(page.getByText('0 tasks')).toBeVisible();
  });

  test('should handle XSS-like search string without breaking the tasks table', async ({ page }) => {
    const search = page.locator('main').getByPlaceholder(/Search tasks/i);
    await search.scrollIntoViewIfNeeded();
    await search.fill(INVALID_INPUTS.xssPayload, { force: true });
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
  });

  test('should toggle Agent Tasks filter', async ({ page }) => {
    await page.getByRole('button', { name: /Agent Tasks/i }).click();
    await expect(page.locator('thead').getByText('Agent Status', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /Agent Tasks/i }).click();
    await expect(page.locator('thead').getByText('Agent Status', { exact: true })).toHaveCount(0);
  });
});
