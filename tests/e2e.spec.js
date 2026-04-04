import { LoginPage } from "../pages/loginPage.js";
import { InvertoryPage } from "../pages/inventoryPage.js";
import { CartPage } from "../pages/cartPage.js";
import { CheckoutStepOnePage } from "../pages/checkoutStepOnePage.js";
import { CheckoutStepTwoPage } from "../pages/checkoutStepTwoPage.js";
import { CheckoutCompletePage } from "../pages/checkoutCompletePage.js";

// Импортируем 'test' и 'expect' из библиотеки Playnwright
const { test, expect } = require("@playwright/test");

// Описываем наш набор тестов
test.describe("E2E тест на Sauce Demo", () => {
  // Создаем тест-кейс
  test("Полный процесс покупки", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    try {
      await loginPage.login("standard_user", "secret_sauce");

      // Проверка, что открылась страница с товарами.
      const invertoryPage = new InvertoryPage(page);
      const title = await invertoryPage.getPageTitle();
      expect(title).toBe("Products");

      //Сортировка товара от самого дорого к дешевому. Добавление товара в корзину.
      await invertoryPage.sortHilo();
      const itemName = await invertoryPage.getItemName();
      await invertoryPage.addItemToCart(itemName);

      await invertoryPage.openCart();

      // Проверка, что в корзине добавлен нужный товар.
      const cartPage = new CartPage(page);
      const cartList = await cartPage.checkCurrentlyCart();
      expect(cartList).toContain(itemName);
      expect(cartList).toHaveLength(1);

      //Начать оформление заказа
      await cartPage.goToCheckout();

      // Заполнение информации о пользователе и нажатие кнопки Continue.
      const checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.fillUserInfo("Test", "User", "12345");

      // Завершение покупки
      const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      await checkoutStepTwoPage.finishCheckout();

      // Проверка, что заказ успешно оформлен.
      const checkoutCompletePage = new CheckoutCompletePage(page);
      const checkText = await checkoutCompletePage.getCompletionMessage();
      expect(checkText).toBe("Thank you for your order!");
    } catch (error) {
      console.log(error);
    }
  });
});
