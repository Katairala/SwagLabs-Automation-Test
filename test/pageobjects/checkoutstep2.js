class CheckoutStepTwo {
  get finishBtn() {
    return $("#finish");
  }
  get cancelTwoBtn() {
    return $("#cancel");
  }

  openCheckoutStepTwo() {
    return browser.url("https://www.saucedemo.com/checkout-step-two.html");
  }
}

export default new CheckoutStepTwo();
