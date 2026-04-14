import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, INVALID_INPUTS } from '../helpers/test-data';

test.describe('Help & Support — Edge Cases', () => {
  test('should keep help page stable when typing special characters in the document', async ({ page }) => {
    await page.goto(ROUTES.help);
    await page.keyboard.type(INVALID_INPUTS.xssPayload);
    await expect(page.getByRole('heading', { name: 'Help & Support' })).toBeVisible();
  });
});
