import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';
import { mockNetworkFailure } from '../helpers/api.helper';

test.describe('AI Agents — Error States', () => {
  test('should render hub when optional API calls fail', async ({ page }) => {
    await mockNetworkFailure(page, '**/api/**');
    await page.goto(ROUTES.aiAgents);
    await expect(page.getByRole('heading', { name: 'AI Agents' })).toBeVisible();
  });

  test('should show empty table message when filters exclude all runs', async ({ page }) => {
    await page.goto(ROUTES.aiAgents);
    await page.locator('select').first().selectOption({ label: 'Failed' });
    await page.getByPlaceholder(/Search client or task/i).fill('___nomatch___');
    await expect(page.getByText('No agent runs match your filters.')).toBeVisible();
  });
});
