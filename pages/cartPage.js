 export class CartPage{
    constructor(page) {
        this.page = page;
        
        this.cartList = page.locator('[data-test="cart-list"]');
        this.buttonCheckout = page.locator('[data-test="checkout"]');
        this.buttonContinueShopping = page.locator('[data-test="continue-shopping"]');
        this.buttonRemove = page.locator('.cart_button');
    }

    async checkCurrentlyCart(){
        let nameOfItems = []
        for(const item of await this.cartList.all()){
            const name = await item.locator('[data-test="inventory-item-name"]').textContent();
            nameOfItems.push(name);
        }
        return nameOfItems;
    }

    async goBackShopping(){
        await this.buttonContinueShopping.click();
    }

    async removeItem(itemName){
        const item = await this.cartList.locator(`.cart_item:has-text("${itemName}")`)
        await item.locator(this.buttonRemove).click()

    }

    async goToCheckout(){
        await this.buttonCheckout.click();
    }
 }