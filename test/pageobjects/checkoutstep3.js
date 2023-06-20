class CheckoutStepThree {
  get homeBtn() {
    return $("#back-to-products");
  }

  openCheckoutStepThree() {
    return browser.url("https://www.saucedemo.com/checkout-complete.html");
  }
}

export default new CheckoutStepThree();
