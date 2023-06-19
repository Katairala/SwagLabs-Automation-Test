class CartPage {
  get continueShopBtn() {
    return $("#continue-shopping");
  }
  get checkoutBtn() {
    return $("#checkout");
  }

  openCart() {
    return browser.url("https://www.saucedemo.com/cart.html");
  }
}

export default new CartPage();
