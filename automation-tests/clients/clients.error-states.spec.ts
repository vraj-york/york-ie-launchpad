import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, MOCK_CLIENT_NAME } from '../helpers/test-data';
import { mockApiError } from '../helpers/api.helper';

test.describe('Clients — Error States', () => {
  test('should load clients even when a generic API stub returns 500', async ({ page }) => {
    await mockApiError(page, '**/api/**', 500);
    await page.goto(ROUTES.clients);
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible();
  });

  test('should recover detail panel after invalid modal close via Cancel', async ({ page }) => {
    await page.goto(ROUTES.clients);
    await page.getByRole('row', { name: new RegExp(MOCK_CLIENT_NAME) }).click();
    await page.getByRole('button', { name: 'AI Agents' }).click();
    await page.getByRole('button', { name: /Add Configuration/i }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('heading', { name: /Add Agent Configuration/i })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: MOCK_CLIENT_NAME, level: 2 })).toBeVisible();
  });
});
