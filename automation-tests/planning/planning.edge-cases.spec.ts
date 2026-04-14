import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';

test.describe('Planning — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.planning);
  });

  test('should step week navigation buttons without errors', async ({ page }) => {
    const weekStrip = page.getByText('Mar 24–28 — Apr 21–25').locator('..');
    await weekStrip.getByRole('button').last().click({ force: true });
    await weekStrip.getByRole('button').first().click({ force: true });
    await expect(page.getByRole('heading', { name: 'Planning' })).toBeVisible();
  });

  test('should keep page stable when switching assignee filter back to all', async ({ page }) => {
    const select = page.locator('select').first();
    const label = (await select.locator('option').nth(1).textContent())?.trim() ?? '';
    await select.selectOption({ label });
    await select.selectOption({ label: 'All Team Members' });
    await expect(page.getByRole('heading', { name: 'Planning' })).toBeVisible();
  });
});
