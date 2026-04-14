import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, MOCK_TEMPLATE_NAME } from '../helpers/test-data';

test.describe('Templates — Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.templates);
  });

  test('should list templates and show detail for Monthly Bookkeeping', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Templates' })).toBeVisible();
    await page.getByRole('row', { name: new RegExp(MOCK_TEMPLATE_NAME) }).click();
    await expect(page.getByRole('heading', { name: MOCK_TEMPLATE_NAME })).toBeVisible();
  });

  test('should open Add Task side panel', async ({ page }) => {
    await page.getByRole('row', { name: new RegExp(MOCK_TEMPLATE_NAME) }).click();
    await page.getByRole('button', { name: /Add Task/i }).click();
    await expect(page.getByRole('heading', { name: 'Add Task' })).toBeVisible();
  });
});
