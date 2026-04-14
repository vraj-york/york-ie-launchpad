import { test, expect } from '../fixtures/app.fixture';
import { ROUTES } from '../helpers/test-data';
import { goTo } from '../helpers/navigation.helper';

test.describe('App navigation — Happy Path', () => {
  test('should redirect home to projects and show shell branding', async ({ page }) => {
    await page.goto(ROUTES.home);
    await expect(page).toHaveURL(new RegExp(`${ROUTES.projects.replace('/', '\\/')}$`));
    await expect(page.getByText('Jetpack Workflow')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
  });

  test('should reach primary modules from the sidebar', async ({ page }) => {
    await goTo(page, 'projects');
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();

    await page.getByRole('link', { name: 'Clients' }).click();
    await expect(page).toHaveURL(new RegExp(`${ROUTES.clients.replace('/', '\\/')}$`));
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible();

    await page.getByRole('link', { name: 'Templates' }).click();
    await expect(page.getByRole('heading', { name: 'Templates' })).toBeVisible();

    await page.getByRole('link', { name: 'AI Notetaker' }).click();
    await expect(page.getByRole('heading', { name: 'AI Notetaker' })).toBeVisible();
  });
});
