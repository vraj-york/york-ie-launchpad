import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, MOCK_CLIENT_NAME, INVALID_INPUTS } from '../helpers/test-data';

test.describe('Clients — Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.clients);
    await page.getByRole('row', { name: new RegExp(MOCK_CLIENT_NAME) }).click();
  });

  test('should allow typing a long notes value without crashing', async ({ page }) => {
    const notes = page.getByPlaceholder(/Add notes about this client/i);
    await notes.fill(INVALID_INPUTS.longString);
    await expect(notes).toHaveValue(INVALID_INPUTS.longString);
  });

  test('should paste SQL injection into file path field in agent modal without breaking modal', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'AI Agents' }).click();
    await page.getByRole('button', { name: /Add Configuration/i }).click();
    await page.locator('select').first().selectOption({ value: 'Transaction Analysis' });
    const pathInput = page.getByPlaceholder(/Clients\//);
    await pathInput.fill(INVALID_INPUTS.sqlInjection);
    await expect(pathInput).toHaveValue(INVALID_INPUTS.sqlInjection);
  });

  test('should switch agent type cards in configuration modal', async ({ page }) => {
    await page.getByRole('button', { name: 'AI Agents' }).click();
    await page.getByRole('button', { name: /Add Configuration/i }).click();
    await page.getByRole('button', { name: 'Claude Cowork' }).click();
    await expect(page.getByRole('button', { name: 'Claude Cowork' })).toBeVisible();
  });
});
