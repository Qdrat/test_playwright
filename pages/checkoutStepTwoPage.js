export class CheckoutStepTwoPage{
    constructor(page){
        this.page = page;

        this.summaryInfo = page.locator('.summary_info_label')
        this.totalPrice= page.locator('.summary_total_label');
        this.buttonFinish = page.locator('.cart_button');

    }

    async finishCheckout(){
        await this.buttonFinish.click();
    }
}