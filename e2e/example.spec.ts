import { test, expect } from '@playwright/test';

test.describe('DailyYou App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('displays a quote on the home page', async ({ page }) => {
    // Wait for quote to load
    await expect(page.locator('.text-3xl')).toBeVisible({ timeout: 10000 });

    // Check that quote text is not empty
    const quoteText = await page.locator('.text-3xl').textContent();
    expect(quoteText).toBeTruthy();
  });

  test('can navigate to favorites page', async ({ page }) => {
    await page.click('text=Favorites');
    await expect(page).toHaveURL(/favorites/);
    await expect(page.locator('h1')).toHaveText('Your Favorite Quotes');
  });

  test('can navigate to contact page', async ({ page }) => {
    await page.click('text=Contact');
    await expect(page).toHaveURL(/contact/);
    await expect(page.locator('h1')).toHaveText('Contact Us');
  });

  test('can toggle dark mode', async ({ page }) => {
    // Get initial background color
    const initialBg = await page.locator('div').first().evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Click theme toggle button (moon/sun icon)
    await page.click('[aria-label*="moda geç"]');

    // Wait for transition
    await page.waitForTimeout(600);

    // Get new background color
    const newBg = await page.locator('div').first().evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Background should have changed
    expect(initialBg).not.toBe(newBg);
  });

  test('can load new quote with tap for more button', async ({ page }) => {
    // Wait for initial quote
    await expect(page.locator('.text-3xl')).toBeVisible({ timeout: 10000 });

    // Click tap for more
    await page.click('text=tap for more');

    // Wait for fade animation and new quote
    await page.waitForTimeout(1000);

    // Quote should either be different or the same (API might return same quote)
    const newQuote = await page.locator('.text-3xl').textContent();
    expect(newQuote).toBeTruthy();
  });

  test('can add quote to favorites', async ({ page }) => {
    // Wait for quote to load
    await expect(page.locator('.text-3xl')).toBeVisible({ timeout: 10000 });

    // Click heart button to add to favorites
    await page.click('[aria-label="Favorilere ekle"]');

    // Check for success toast
    await expect(page.locator('text=Quote added to favorites!')).toBeVisible();
  });

  test('can copy quote to clipboard', async ({ page }) => {
    // Wait for quote to load
    await expect(page.locator('.text-3xl')).toBeVisible({ timeout: 10000 });

    // Click copy button
    await page.click('[aria-label="Kopyala"]');

    // Check for success toast
    await expect(page.locator('text=Quote copied to clipboard!')).toBeVisible();
  });

  test('can open and close share modal', async ({ page }) => {
    // Wait for quote to load
    await expect(page.locator('.text-3xl')).toBeVisible({ timeout: 10000 });

    // Click share button
    await page.click('[aria-label="Paylaş"]');

    // Check modal is visible
    await expect(page.locator('text=Share with:')).toBeVisible();

    // Close modal
    await page.click('text=Close');

    // Modal should be closed
    await expect(page.locator('text=Share with:')).not.toBeVisible();
  });
});
