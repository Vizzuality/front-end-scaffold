import { test, expect } from '@playwright/test';

test('checks title of the page ', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle('Welcome');
});

test('gets level 1 Heading', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Welcome to Vizzuality Front End scaffold project.'
  );
});
