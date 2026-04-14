import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';

test.describe('AI Agents — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.aiAgents);
  });

  test('should filter runs when searching for a client substring', async ({ page }) => {
    const search = page.getByPlaceholder(/Search client or task/i);
    await search.scrollIntoViewIfNeeded();
    await search.fill('Baker');
    const hit = page.locator('table').getByText(/Baker Dental/i).first();
    await hit.scrollIntoViewIfNeeded();
    await expect(hit).toBeAttached();
    await expect(await hit.innerText()).toMatch(/Baker Dental/i);
  });

  test('should show empty state preview when toggled', async ({ page }) => {
    await page.getByRole('button', { name: /Empty state/i }).click();
    await expect(page.getByText(/Automate your recurring work/i)).toBeVisible();
    await page.getByRole('button', { name: /View Hub/i }).click();
    await expect(page.getByRole('heading', { name: 'AI Agents' })).toBeVisible();
  });
});
