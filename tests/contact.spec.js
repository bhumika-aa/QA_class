import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po.js';
import { ContactPage } from '../pageObjects/contact.po.js';
import { authenticateUser, createEntity } from '../Helper/helper.spec.js';
import testData from '../fixtures/loginFixtures.json';
import contactTestData from '../fixtures/contactFixtures.json';
import {validateEntity, getEntity, deleteEntity } from '../Helper/helper.spec.js';
import { access } from 'node:fs';

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login("bhumika1@gmail.com", "Bhumika123");
    await login.verifyValidLogin();
});

test.describe('Contact testcases', () => {

    test('Contact Add test', async ({ page, request }) => {
        const contact = new ContactPage(page);

        await contact.contactAdd("Rajesh", "hamal", "1919-12-12", "hamal@gmail.com", "980000000", "Thamel", "Kathmandu", "Bagmati", "44600", "Nepal");
        await contact.viewContact();

        await contact.validateContactCreated("Rajesh", "hamal", "1919-12-12", "hamal@gmail.com", "98000000", "Thamel", "Kathmandu", "Bagmati", "44600", "Nepal");
    });
    test('Contact Edit test', async ({ page, request }) => {
        const Data = {
            "firstName": "Bhumika",
            "lastName": "Neupane",
            "birthdate": "2005-07-02",
            "email": "bhumika1@gmail.com",
            "phone": "9898989898",
            "street1": "Add1",
            "city": "City1",
            "stateProvince": "State1",
            "postalCode": "12345",
            "country": "Nepal"
        };

        const contact = new ContactPage(page);

        const accessToken = await authenticateUser(testData.validUser.username, testData.validUser.password, { request });
        await createEntity(Data, accessToken, '/contacts', { request });

        await page.reload();
        await contact.viewContact();
        await contact.contactEdit(
            contactTestData.contact1.firstName,
            contactTestData.contact1.lastName,
            contactTestData.contact1.birthdate,
            contactTestData.contact1.email,
            contactTestData.contact1.phone,
            contactTestData.contact1.street1,
            contactTestData.contact1.city,
            contactTestData.contact1.stateProvince,
            contactTestData.contact1.postalCode,
            contactTestData.contact1.country
        );

        const id = await getEntity(accessToken, '/contacts','200', { request });
        await deleteEntity(id, accessToken, `/contacts/${id}`, { request });
        await validateEntity(id, accessToken, `/contacts/${id}`, '404', { request });

        await contact.validateContactCreated(
            contactTestData.contact1.firstName,
            contactTestData.contact1.lastName,
            contactTestData.contact1.birthdate,
            contactTestData.contact1.email,
            contactTestData.contact1.phone,
            contactTestData.contact1.street1,
            contactTestData.contact1.city,
            contactTestData.contact1.stateProvince,
            contactTestData.contact1.postalCode,
            contactTestData.contact1.country
        );


    });

    test.only('Contact Delete test', async ({ page, request }) => {
        const Data = {
            "firstName": "Bhumika",
            "lastName": "Neupane",
            "birthdate": "2005-07-02",
            "email": "bhumika1@gmail.com",
            "phone": "9898989898",
            "street1": "Add1",
            "city": "City1",
            "stateProvince": "State1",
            "postalCode": "12345",
            "country": "Nepal"
        };
    const contact = new ContactPage(page);
    accessToken = await authenticateUser(testData.validUser.username, testData.validUser.password, { request });
    await createEntity(Data, accessToken, '/contacts', { request });
    page.reload();
    await contact.viewContact();
    const id = await getEntity(accessToken, '/contacts','200', { request });
    await contact.contactDelete();
    await validateEntity(id, accessToken, `/contacts/${id}`, '404', { request });
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

});