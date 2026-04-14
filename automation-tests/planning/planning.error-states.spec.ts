import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';
import { mockApiError } from '../helpers/api.helper';

test.describe('Planning — Error States', () => {
  test('should still show planning when mocked backend errors', async ({ page }) => {
    await mockApiError(page, '**/api/**', 503, 'Unavailable');
    await page.goto(ROUTES.planning);
    await expect(page.getByRole('heading', { name: 'Planning' })).toBeVisible();
  });
});
