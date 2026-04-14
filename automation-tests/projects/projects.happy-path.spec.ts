import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, MOCK_PROJECT_NAME } from '../helpers/test-data';

test.describe('Projects — Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.projects);
  });

  test('should list projects and open the detail drawer', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Create Project/i })).toBeVisible();
    await page.getByRole('row', { name: new RegExp(MOCK_PROJECT_NAME) }).click();
    await expect(page.getByRole('heading', { name: MOCK_PROJECT_NAME, level: 2 })).toBeVisible();
  });

  test('should add a project comment and show it in the thread', async ({ page }) => {
    await page.getByRole('row', { name: new RegExp(MOCK_PROJECT_NAME) }).click();
    const comment = `E2E comment ${Date.now()}`;
    await page.getByPlaceholder(/Add a comment/i).fill(comment);
    await page.getByRole('button', { name: /^Post$/i }).click();
    await expect(page.getByText(comment, { exact: true })).toBeVisible();
  });
});
