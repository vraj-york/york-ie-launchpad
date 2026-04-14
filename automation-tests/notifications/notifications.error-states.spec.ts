import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';
import { mockNetworkFailure } from '../helpers/api.helper';

test.describe('Notifications — Error States', () => {
  test('should render notifications when external API paths fail', async ({ page }) => {
    await mockNetworkFailure(page, '**/api/**');
    await page.goto(ROUTES.notifications);
    await expect(page.getByRole('heading', { name: 'Notifications' })).toBeVisible();
  });
});
