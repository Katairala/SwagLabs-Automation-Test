class ProductsPage {
  get backpack() {
    return $("#item_4_title_link > div");
  }
  get addBackpackBtn() {
    return $("#add-to-cart-sauce-labs-backpack");
  }
  get removeBackpackBtn() {
    return $("#remove-sauce-labs-backpack");
  }

  get bike() {
    return $("#item_0_title_link > img");
  }
  get addBikeBtn() {
    return $("#add-to-cart-sauce-labs-bike-light");
  }
  get removeBikeBtn() {
    return $("#remove-sauce-labs-bike-light");
  }

  get shirt() {
    return $("#item_1_title_link > div");
  }
  get addShirtBtn() {
    return $("#add-to-cart-sauce-labs-bolt-t-shirt");
  }
  get removeShirtBtn() {
    return $("#remove-sauce-labs-bolt-t-shirt");
  }

  get cartBtn() {
    return $(".shopping_cart_link");
  }

  openProductsPage() {
    return browser.url("https://www.saucedemo.com/inventory.html");
  }

  async addToCart(itemBtn) {
    await itemBtn.click();
  }

  async removeFromCart(itemBtn) {
    await itemBtn.click();
  }
}
export default new ProductsPage();
