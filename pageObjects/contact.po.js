import { expect } from '@playwright/test';

export class ContactPage {
    constructor(page) {
        this.page = page;
        this.addContactButton = '#add-contact';
        this.firstNameInput = '#firstName';
        this.lastNameInput = '#lastName';
        this.birthdateInput = '#birthdate';
        this.emailInput = '#email';
        this.phoneInput = '#phone';
        this.street1Input = '#street1';
        this.cityInput = '#city';
        this.submitButton = '#submit';
        this.contactTable = '.contactTable';
    }

    async navigateToAddContact() {
        await this.page.click(this.addContactButton);
    }

    async fillContactDetails(details) {
        await this.page.fill(this.firstNameInput, details.firstName);
        await this.page.fill(this.lastNameInput, details.lastName);
        if (details.email) await this.page.fill(this.emailInput, details.email);
        await this.page.click(this.submitButton);
    }

    async verifyContactInList(fullName) {
        const row = this.page.locator(this.contactTable);
        await expect(row).toContainText(fullName);
    }
}