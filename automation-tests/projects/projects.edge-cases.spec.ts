import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, MOCK_PROJECT_NAME, INVALID_INPUTS } from '../helpers/test-data';

test.describe('Projects — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.projects);
    await page.getByRole('row', { name: new RegExp(MOCK_PROJECT_NAME) }).click();
  });

  test('should clear all filter pills when Clear all is used', async ({ page }) => {
    await expect(page.getByText('Clear all')).toBeVisible();
    await page.getByRole('button', { name: 'Clear all' }).click();
    await expect(page.getByText('Clear all')).toHaveCount(0);
  });

  test('should treat whitespace-only comment as non-submittable', async ({ page }) => {
    const justNow = page.getByText('Just now');
    const before = await justNow.count();
    await page.getByPlaceholder(/Add a comment/i).fill(INVALID_INPUTS.whitespaceOnly);
    await page.getByRole('button', { name: /^Post$/i }).click();
    await expect(justNow).toHaveCount(before);
  });

  test('should render XSS-like text as plain content, not execute', async ({ page }) => {
    await page.getByPlaceholder(/Add a comment/i).fill(INVALID_INPUTS.xssPayload);
    await page.getByRole('button', { name: /^Post$/i }).click();
    await expect(page.getByText(INVALID_INPUTS.xssPayload, { exact: true })).toBeVisible();
  });

  test('should not duplicate comment when Post is double-clicked quickly', async ({ page }) => {
    const comment = `Double post check ${Date.now()}`;
    await page.getByPlaceholder(/Add a comment/i).fill(comment);
    const post = page.getByRole('button', { name: /^Post$/i });
    await post.dblclick();
    await expect(page.getByText(comment, { exact: true })).toHaveCount(1);
  });
});
