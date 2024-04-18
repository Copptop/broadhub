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

test('Load Analytics Data', async ({ page }) => {
  // Go to Login Page and Login
  await page.goto('https://broadhub.vercel.app/auth/signin?callbackUrl=%2F');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Dev.Coppertop+Broadhub.AyrtonSenna@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Password@1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  // Click on the "A Analytics" link
  await page.getByRole('link', { name: 'A Analytics' }).click();
  // Click on the "Week History" button
  await page.getByRole('button', { name: 'Week History' }).click();
  // Click on the "3 Month History" text
  await page.getByText('3 Month History').click();
  // Click on the "Search" button
  await page.getByRole('button', { name: 'Search' }).click();
  // Expect the text 'Make-up' to be visible
  await expect(page.getByText('Make-up')).toBeVisible();
})

*/
