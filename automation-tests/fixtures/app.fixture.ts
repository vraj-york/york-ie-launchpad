import { test as base, Page } from '@playwright/test';
import { loginAs } from '../helpers/auth.helper';

type AppFixtures = {
  authenticatedPage: Page;
  adminPage: Page;
};

export const test = base.extend<AppFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await loginAs(page, 'validUser');
    await use(page);
  },
  adminPage: async ({ page }, use) => {
    await loginAs(page, 'adminUser');
    await use(page);
  },
});

export { expect } from '@playwright/test';
