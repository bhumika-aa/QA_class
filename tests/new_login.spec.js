import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po.js';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('ValidLogin Tests', () => {
    test(' Login using valid username and password ', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('bhumika1@gmail.com', 'Bhumika123');
        await login.verifyValidLogin();
    });
})

test.describe('InvalidLogin Tests', () => {
    test('Login using invalid username and valid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('bhumika@gmail.com', 'Bhumika123');
        await login.verifyInvalidLogin();
    });

    test('Login using valid username and invalid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('bhumika1@gmail.com', '1234');
        await login.verifyInvalidLogin();
    });

    test('Login using invalid username and invalid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('bhumika@gmail.com', '1234');
        await login.verifyInvalidLogin();
    });


    test('Login using empty username and valid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('', '1234');
        await login.verifyInvalidLogin();
    });

    test('Login using valid username and empty password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('bhumika1@gmail.com', '');
        await login.verifyInvalidLogin();
    });


    test('Login using empty username and empty password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('', '');
        await login.verifyInvalidLogin();
    });
})