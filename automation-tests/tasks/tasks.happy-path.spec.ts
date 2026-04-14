import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, MOCK_TASK_NAME } from '../helpers/test-data';

test.describe('Tasks — Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.tasks);
  });

  test('should filter tasks via search and open the detail drawer', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
    const search = page.locator('main').getByPlaceholder(/Search tasks/i);
    await search.scrollIntoViewIfNeeded();
    await search.fill(MOCK_TASK_NAME, { force: true });
    await page.getByRole('row', { name: new RegExp(MOCK_TASK_NAME) }).click();
    await expect(page.getByRole('heading', { name: MOCK_TASK_NAME, level: 2 })).toBeVisible();
  });

  test('should delegate a task to an AI agent from the panel', async ({ page }) => {
    await page.getByRole('row', { name: new RegExp(MOCK_TASK_NAME) }).click();
    await page.getByRole('button', { name: 'AI Agent' }).click();
    await page.getByRole('button', { name: /Delegate to AI/i }).click();
    await expect(page.getByRole('row', { name: new RegExp(MOCK_TASK_NAME) })).toContainText('AI');
  });
});
