import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, SAMPLE_MEETING_IDS, INVALID_INPUTS } from '../helpers/test-data';

test.describe('AI Notetaker — Edge Cases', () => {
  test('should keep Send Bot disabled until link and client are set', async ({ page }) => {
    await page.goto(ROUTES.aiNotetaker);
    await page.getByRole('button', { name: /Start New Meeting/i }).click();
    const send = page.getByRole('button', { name: /Send Bot to Meeting/i });
    await expect(send).toBeDisabled();
    await page.getByPlaceholder(/Zoom, Meet, or Teams/i).fill('https://meet.google.com/abc-defg-hij');
    await expect(send).toBeDisabled();
    await page.locator('select').first().selectOption({ index: 1 });
    await expect(send).toBeEnabled();
  });

  test('should accept long meeting title without crashing', async ({ page }) => {
    await page.goto(ROUTES.aiNotetaker);
    await page.getByRole('button', { name: /Start New Meeting/i }).click();
    await page.locator('select').first().selectOption({ index: 1 });
    await page.getByPlaceholder(/Q1 Review/i).fill(INVALID_INPUTS.longString);
    await expect(page.getByPlaceholder(/Q1 Review/i)).toHaveValue(INVALID_INPUTS.longString);
  });

  test('should show review UI for suggestions-ready meeting', async ({ page }) => {
    await page.goto(ROUTES.aiNotetakerReview(SAMPLE_MEETING_IDS.suggestionsReady));
    const title = page.getByRole('heading', { name: /Post-Call Review/i });
    await title.scrollIntoViewIfNeeded();
    await expect(title).toBeAttached();
    await expect(await title.innerText()).toMatch(/Post-Call Review/i);
  });
});
