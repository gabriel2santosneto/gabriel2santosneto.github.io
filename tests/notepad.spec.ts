import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:1998/');
});

test('can open Contact Info.txt from My Documents', async ({ page }) => {
	const responsePromise = page.waitForResponse('**/my-documents/Contact%20Info.txt');
	await page.locator('.desktop-icon', { hasText: 'My Documents' }).dblclick();

	const explorerFrame = page.frameLocator('iframe[src*="my-documents"]').first();
	await explorerFrame.locator('.desktop-icon', { hasText: 'Contact Info.txt' }).dblclick();

	// should have taskbar button and application window
	await expect(page.getByRole("button", { name: 'Contact Info.txt - Notepad' })).toBeVisible();
	await expect(page.locator('.window-title', { hasText: 'Contact Info.txt - Notepad' })).toBeVisible();

	// should load the file content
	await responsePromise;

	const rootFolder = require('path').resolve(__dirname, '..');
	const expectedText = require('fs').readFileSync(rootFolder + '/my-documents/Contact Info.txt', 'utf8');
	const actualText = await page.frameLocator('iframe').locator(':focus').evaluate((el: HTMLTextAreaElement) => el.value);
	expect(actualText.replace(/\r\n/g, '\n')).toBe(expectedText.replace(/\r\n/g, '\n'));
});
