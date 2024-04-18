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

test('Book Resource Via Map', async ({ page }) => {
  // Go to Login Page and Login
  await page.goto('https://broadhub.vercel.app/auth/signin?callbackUrl=%2F');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Dev.Coppertop+Broadhub.AyrtonSenna@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Password@1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  await page.getByRole('link', { name: 'Map View' }).click(); // Go to Map View
  await page.waitForLoadState // Wait for the page to load
  await page.click('#APAC'); // Click on APAC
  await page.click('#Manila'); // Click on Manila
  await page.getByRole('button', { name: 'Floor -' }).click(); // Click on Floor 0
  await page.waitForLoadState  //   Wait for the page to load
  await page.locator('#bay-51').getByText('P').click();   // Click on a bay
  // Book the bay
  await page.getByRole('button', { name: 'Book' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
})

test('Book Resource Via list', async ({ page }) => {
  // Go to Login Page and Login
  await page.goto('https://broadhub.vercel.app/auth/signin?callbackUrl=%2F');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Dev.Coppertop+Broadhub.AyrtonSenna@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Password@1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  // Navigate to List View
  await page.getByRole('link', { name: 'List View' }).click();
  // Select APAC
  await page.getByRole('link', { name: 'APAC' }).click();
  // Select Manila
  await page.getByRole('link', { name: 'Manila' }).click();
  // Select Floor 0
  await page.getByRole('link', { name: 'Floor 0' }).click();
  // Go to the list view page
  await page.goto('https://broadhub.vercel.app/list/APAC/Manila/floor0');
  // Click on the first resource's button
  await page.click('body > div:nth-child(2) > div > main > div > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4) > div> button');
  // Click on the "Favorite" button
  await page.getByRole('button', { name: 'Favorite' }).click();
  // Click on the "Book" button
  await page.getByRole('button', { name: 'Book' }).click();
  // Click on the "Close" button
  await page.getByRole('button', { name: 'Close' }).click();
})

test('Open Booking search', async ({ page }) => {
  // Go to Login Page and Login
  await page.goto('https://broadhub.vercel.app/auth/signin?callbackUrl=%2F');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Dev.Coppertop+Broadhub.AyrtonSenna@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Password@1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  // Click on the "Previous Bookings" link
  await page.getByRole('link', { name: 'Previous Bookings' }).click();
  // Click on the "Search Bookings" button
  await page.getByRole('button', { name: 'Search Bookings' }).click();
  // Click on the search input field
  await page.getByPlaceholder('Search...').click();
  // Fill the search input field with '?'
  await page.getByPlaceholder('Search...').fill('?');
  // Expect the text 'Help with searching' to be visible
  await expect(page.getByText('Help with searching')).toBeVisible();
})

test('Cancel Upcoming Booking', async ({ page }) => {
  // Go to Login Page and Login
  await page.goto('https://broadhub.vercel.app/auth/signin?callbackUrl=%2F');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Dev.Coppertop+Broadhub.AyrtonSenna@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Password@1');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  // Click on the booking element
  await page.click('body > div:nth-child(2) > div > main > div > div > div:nth-child(1) > ul > li:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button');
  // Click on the "Edit" menu item
  await page.getByRole('menuitem', { name: 'Edit' }).click();
  // Click on the "Cancel Booking" button
  await page.getByRole('button', { name: 'Cancel Booking' }).click();
  // Click on the "Confirm" button
  await page.getByRole('button', { name: 'Confirm' }).click();
})
*/
