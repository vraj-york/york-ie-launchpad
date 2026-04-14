import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';

test.describe('Planning — Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.planning);
  });

  test('should show planning grid and week range strip', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Planning' })).toBeVisible();
    await expect(page.getByText('Mar 24–28 — Apr 21–25')).toBeVisible();
  });

  test('should change assignee filter away from All', async ({ page }) => {
    const assigneeSelect = page.locator('select').first();
    const firstMember = (await assigneeSelect.locator('option').nth(1).textContent())?.trim();
    if (!firstMember) throw new Error('No team member option');
    await assigneeSelect.selectOption({ label: firstMember });
    await expect(assigneeSelect).not.toHaveValue('All');
  });
});
