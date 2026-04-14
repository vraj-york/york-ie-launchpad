import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, SAMPLE_MEETING_IDS } from '../helpers/test-data';
import { mockApiError } from '../helpers/api.helper';

test.describe('AI Notetaker — Error States', () => {
  test('should show not-found state for invalid meeting id on review route', async ({ page }) => {
    await page.goto(ROUTES.aiNotetakerReview(SAMPLE_MEETING_IDS.invalid));
    await expect(page.getByText('Meeting not found')).toBeVisible();
    await page.getByRole('button', { name: /Back to AI Notetaker/i }).click();
    await expect(page).toHaveURL(new RegExp(`${ROUTES.aiNotetaker.replace('/', '\\/')}$`));
  });

  test('should load hub when mocked APIs fail', async ({ page }) => {
    await mockApiError(page, '**/api/**', 500);
    await page.goto(ROUTES.aiNotetaker);
    await expect(page.getByRole('heading', { name: 'AI Notetaker' })).toBeVisible();
  });
});
