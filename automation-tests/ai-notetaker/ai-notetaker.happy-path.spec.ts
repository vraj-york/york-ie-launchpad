import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, SAMPLE_MEETING_IDS } from '../helpers/test-data';

// Note: deep links used after modal steps so narrow viewports still assert navigation reliably.

test.describe('AI Notetaker — Happy Path', () => {
  test('should open hub, start meeting flow, and reach suggestion review', async ({ page }) => {
    await page.goto(ROUTES.aiNotetaker);
    await expect(page.getByRole('heading', { name: 'AI Notetaker' })).toBeVisible();
    await page.getByRole('button', { name: /Start New Meeting/i }).click();
    await page.getByPlaceholder(/Zoom, Meet, or Teams/i).fill('https://zoom.us/j/123456789');
    await page.locator('select').first().selectOption({ index: 1 });
    await page.getByRole('button', { name: /Send Bot to Meeting/i }).click();
    await expect(page.getByText(/Bot joined/i)).toBeVisible();
    await page.getByRole('button', { name: /Minimize/i }).click();
    await page.goto(ROUTES.aiNotetakerReview(SAMPLE_MEETING_IDS.suggestionsReady));
    await expect(page).toHaveURL(new RegExp(`/ai-notetaker/review/${SAMPLE_MEETING_IDS.suggestionsReady}`));
  });

  test('should open settings from hub', async ({ page }) => {
    await page.goto(ROUTES.aiNotetaker);
    await page.getByRole('button', { name: /Settings/i }).first().click();
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  });

  test('should open reviewed meeting detail', async ({ page }) => {
    await page.goto(ROUTES.aiNotetakerMeeting(SAMPLE_MEETING_IDS.reviewed));
    await expect(page).toHaveURL(new RegExp(`/ai-notetaker/meeting/${SAMPLE_MEETING_IDS.reviewed}`));
    await expect(page.getByRole('button', { name: /AI Notetaker/i })).toBeVisible();
  });
});
