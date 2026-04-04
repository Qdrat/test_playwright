export class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('[placeholder="Password"]');
        this.submitButton = page.locator('[data-test="login-button"]');
        
        this.errorContainer = page.locator('*:has-text("error")');
        
    }

    async open(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password){
        
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    
        await this.errorContainer.isVisible();
    }
}