import { Page } from '@playwright/test';
import { ROUTES } from './test-data';

/**
 * Jetpack Workflow (this repo) has no authentication — load the main app shell.
 * Named `loginAs` to match the automation rule template; it only ensures the app is ready.
 */
export async function loginAs(
  page: Page,
  _role: 'validUser' | 'adminUser' | 'invalidUser' = 'validUser'
) {
  await page.goto(ROUTES.projects);
  await page.getByRole('heading', { name: 'Projects' }).waitFor({ state: 'visible' });
}

export async function logout(_page: Page) {
  // No logout in the demo app — placeholder for future auth.
}
