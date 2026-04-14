import { test, expect } from '../fixtures/app.fixture';
import { ROUTES, MOCK_PROJECT_NAME } from '../helpers/test-data';
import { mockNetworkFailure } from '../helpers/api.helper';

test.describe('Projects — Error States', () => {
  test('should show meeting-style resilience: app loads after blocked optional JSON probe', async ({
    page,
  }) => {
    await mockNetworkFailure(page, '**/api/**');
    await page.goto(ROUTES.projects);
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
  });

  test('should keep panel usable when navigating away and reopening the same project', async ({
    page,
  }) => {
    await page.goto(ROUTES.projects);
    await page.getByRole('row', { name: new RegExp(MOCK_PROJECT_NAME) }).click();
    await page.getByRole('link', { name: 'Clients' }).click();
    await page.getByRole('link', { name: 'Projects' }).click();
    await page.getByRole('row', { name: new RegExp(MOCK_PROJECT_NAME) }).click();
    await expect(page.getByRole('heading', { name: MOCK_PROJECT_NAME, level: 2 })).toBeVisible();
  });
});
