import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';
import { mockApiError } from '../helpers/api.helper';

test.describe('Help & Support — Error States', () => {
  test('should still render help when mocked APIs error', async ({ page }) => {
    await mockApiError(page, '**/api/**', 500);
    await page.goto(ROUTES.help);
    await expect(page.getByRole('heading', { name: 'Help & Support' })).toBeVisible();
  });
});
