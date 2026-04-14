import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';

test.describe('Help & Support — Happy Path', () => {
  test('should show help cards and expandable FAQs', async ({ page }) => {
    await page.goto(ROUTES.help);
    await expect(page.getByRole('heading', { name: 'Help & Support' })).toBeVisible();
    const docCard = page.getByRole('heading', { name: 'Documentation' });
    await docCard.scrollIntoViewIfNeeded();
    await expect(docCard).toBeAttached();
    await expect(await docCard.innerText()).toBe('Documentation');
    const faq = page.getByText('How do templates work?', { exact: true });
    await faq.scrollIntoViewIfNeeded();
    await faq.click();
    const answer = page.getByText(/Templates define a reusable set of tasks/i);
    await answer.scrollIntoViewIfNeeded();
    await expect(answer).toBeVisible();
  });
});
