import { Page } from '@playwright/test';
import { ROUTES } from './test-data';

type RouteKey = keyof typeof ROUTES;

export async function goTo(page: Page, route: RouteKey) {
  const path = ROUTES[route];
  if (typeof path === 'function') {
    throw new Error(`Use a direct path for dynamic routes, not key: ${String(route)}`);
  }
  await page.goto(path);
}

export async function waitForPageReady(page: Page) {
  await page.waitForLoadState('domcontentloaded');
}
