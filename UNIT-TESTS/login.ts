/*
const { expect, test } = require('@playwright/test')

// Configure the Playwright Test timeout to 210 seconds,
// ensuring that longer tests conclude before Checkly's browser check timeout of 240 seconds.
// The default Playwright Test timeout is set at 30 seconds.
// For additional information on timeouts, visit: https://checklyhq.com/docs/browser-checks/timeouts/
test.setTimeout(210000)

// Set the action timeout to 10 seconds to quickly identify failing actions.
// By default Playwright Test has no timeout for actions (e.g. clicking an element).
test.use({ actionTimeout: 10000 })

test('Login via Credentials', async ({ page }) => {
  // Go to Login Page and Login
  await page.goto('https://broadhub.vercel.app/auth/signin?callbackUrl=%2F');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Dev.Coppertop+Broadhub.AyrtonSenna@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Password@1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  // Click on the "Next month" button
  await page.getByRole('button', { name: 'Next month' }).click();
  // Click on the "Current" button
  await page.getByRole('button', { name: 'Current' }).click();
  // Click on the menu button
  await page.locator('[id="headlessui-menu-button-\\:R1r6da\\:"]').click();
  // Click on the "Sign out" menu item
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
});

test('View Profile', async ({ page }) => {
  // Go to Login Page and Login
  await page.goto('https://broadhub.vercel.app/auth/signin?callbackUrl=%2F');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Dev.Coppertop+Broadhub.AyrtonSenna@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Password@1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  // Click on the menu button
  await page.locator('[id="headlessui-menu-button-\\:R1r6da\\:"]').click();
  // Click on the "Your profile" menu item
  await page.getByRole('menuitem', { name: 'Your profile' }).click();
  // Expect the first form path to be visible
  await expect(page.locator('form path').first()).toBeVisible();
  // Click on the menu button again
  await page.locator('[id="headlessui-menu-button-\\:R1r6da\\:"]').click();
  // Click on the "Sign out" menu item
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
});
*/
