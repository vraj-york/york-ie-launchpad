import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, MOCK_TEMPLATE_NAME, INVALID_INPUTS } from '../helpers/test-data';

test.describe('Templates — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.templates);
    await page.getByRole('row', { name: new RegExp(MOCK_TEMPLATE_NAME) }).click();
    await page.getByRole('button', { name: /Add Task/i }).click();
  });

  test('should accept long task name input in Add Task panel', async ({ page }) => {
    const nameInput = page.getByPlaceholder(/Categorize transactions/i);
    await nameInput.fill(INVALID_INPUTS.longString);
    await expect(nameInput).toHaveValue(INVALID_INPUTS.longString);
  });

  test('should toggle between Team Member and AI Agent assignee modes', async ({ page }) => {
    await page.getByRole('button', { name: 'AI Agent' }).click();
    await expect(page.getByText(/Agent Type/i)).toBeVisible();
    await page.getByRole('button', { name: 'Team Member' }).click();
    await expect(page.getByRole('button', { name: 'Team Member' })).toBeVisible();
  });

  test('should close Add Task panel', async ({ page }) => {
    await page.getByRole('heading', { name: 'Add Task' }).locator('..').getByRole('button').click();
    await expect(page.getByRole('heading', { name: 'Add Task' })).toHaveCount(0);
  });
});
