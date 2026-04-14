import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';
import { mockNetworkFailure } from '../helpers/api.helper';

test.describe('Tasks — Error States', () => {
  test('should render tasks when optional API paths fail', async ({ page }) => {
    await mockNetworkFailure(page, '**/api/**');
    await page.goto(ROUTES.tasks);
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
  });

  test('should clear the date chip by toggling the same quick filter', async ({ page }) => {
    await page.goto(ROUTES.tasks);
    await page.getByRole('button', { name: 'Today' }).click();
    await expect(page.getByText('Due: Today')).toBeVisible();
    await page.getByRole('button', { name: 'Today' }).click();
    await expect(page.getByText('Due: Today')).toHaveCount(0);
  });
});
