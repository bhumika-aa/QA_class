import {test, expect} from '@playwright/test';

test('valid login test', async ({ page }) => {
    await page.goto('https://www.daraz.com.np/');
    await page.locator('//input[@class=\'iweb-input\']').fill('9806665199');

    await expect(page).toHaveTitle(/Daraz/);
});

//const error=await page.locator('//div[@class=\'iweb-error\']').textContent();

test.describe('invalid login test', () => { 
    test('login using invalid username and valid password', async ({ page }) => {
        const login = new loginPage(page);
        await login.login('9806665198', 'validpassword');
        await login.verifyErrorMessage('Invalid username or password');
    });

    test('login using valid username and invalid password', async ({ page }) => {
        const login = new loginPage(page);
        await login.login('9806665199', 'invalidpassword');
        await login.verifyErrorMessage('Invalid username or password');
    });
});