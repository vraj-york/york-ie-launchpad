import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';
import { mockSlowResponse } from '../helpers/api.helper';

test.describe('Templates — Error States', () => {
  test('should still render after slow mocked API response (no network spinner requirement)', async ({
    page,
  }) => {
    await mockSlowResponse(page, '**/api/**', 1500, { ok: true });
    await page.goto(ROUTES.templates);
    await expect(page.getByRole('heading', { name: 'Templates' })).toBeVisible();
  });
});
