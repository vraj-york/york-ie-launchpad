import { Page } from '@playwright/test';

export async function mockApiSuccess(
  page: Page,
  urlPattern: string | RegExp,
  body: object,
  status = 200
) {
  await page.route(urlPattern, route =>
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(body),
    })
  );
}

export async function mockApiError(
  page: Page,
  urlPattern: string | RegExp,
  status = 500,
  message = 'Internal server error'
) {
  await page.route(urlPattern, route =>
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ error: message }),
    })
  );
}

export async function mockNetworkFailure(page: Page, urlPattern: string | RegExp) {
  await page.route(urlPattern, route => route.abort('failed'));
}

export async function mockSlowResponse(
  page: Page,
  urlPattern: string | RegExp,
  delayMs = 3000,
  body: object = {}
) {
  await page.route(urlPattern, async route => {
    await new Promise(r => setTimeout(r, delayMs));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}
