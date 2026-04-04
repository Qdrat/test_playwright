export class CheckoutStepOnePage{
    constructor(page){
        this.page = page;

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.buttonContinue = page.locator('.submit-button');
    }

    async fillUserInfo(firstName, lastName, postalCode){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        
        await this.buttonContinue.click();
    }
}