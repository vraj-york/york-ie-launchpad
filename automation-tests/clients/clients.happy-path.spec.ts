import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, MOCK_CLIENT_NAME } from '../helpers/test-data';

test.describe('Clients — Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.clients);
  });

  test('should list clients and open the detail panel with tabs', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible();
    await page.getByRole('row', { name: new RegExp(MOCK_CLIENT_NAME) }).click();
    await expect(page.getByRole('heading', { name: MOCK_CLIENT_NAME, level: 2 })).toBeVisible();
    await page.getByRole('button', { name: 'Assigned Work' }).click();
    await expect(page.getByText('Recurring Series')).toBeVisible();
    await page.getByRole('button', { name: 'AI Agents' }).click();
    await expect(page.getByText(/Agent Configuration for/)).toBeVisible();
  });

  test('should open Add Agent Configuration modal', async ({ page }) => {
    await page.getByRole('row', { name: new RegExp(MOCK_CLIENT_NAME) }).click();
    await page.getByRole('button', { name: 'AI Agents' }).click();
    await page.getByRole('button', { name: /Add Configuration/i }).click();
    await expect(page.getByRole('heading', { name: /Add Agent Configuration/i })).toBeVisible();
  });
});
