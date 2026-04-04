export class InvertoryPage{
    constructor(page) {
        this.page = page;
        
        this.pageTitle = page.locator('[data-test="title"]');
        this.sort = page.locator('[data-test="product-sort-container"]');
        this.cart = page.locator('[data-test="shopping-cart-link"]');
        this.itemList = page.locator('[data-test="inventory-list"]');
        this.buttonAddToCart = page.locator('.btn_inventory');
    }

    async sortHilo(){
       await this.sort.selectOption('hilo');
    }

    async getItemName(){
        const itemFirst = this.itemList.first();
        const itemName = await itemFirst.locator('[data-test="inventory-item-name"]').first().textContent();
        return itemName
    }

    async addItemToCart(itemName){
        const item = await this.page.locator(`.inventory_item:has-text("${itemName}")`)
        await item.locator(this.buttonAddToCart).click();

    }

    async openCart(){
        await this.cart.click();
    }

    async getPageTitle(){
        return await this.pageTitle.textContent();
    }
}