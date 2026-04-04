export class CheckoutCompletePage{
    constructor(page){
        this.page = page;

        this.orderDispatched = page.locator('[data-test="complete-header"]')
        this.buttunBackToProducts = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage(){
        return await this.orderDispatched.textContent();
    }

}