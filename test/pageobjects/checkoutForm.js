class CheckoutFormPage {
  get inputFirstName() {
    return $("#first-name");
  }
  get inputLastName() {
    return $("#last-name");
  }
  get inputPostalCode() {
    return $("#postal-code");
  }
  get continueBtn() {
    return $("#continue");
  }
  get checkoutErrorMssge() {
    return $(
      "#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3"
    );
  }
  get cancelBtn() {
    return $("#cancel");
  }

  async setFirstName(firstName) {
    await this.inputFirstName.setValue(firstName);
  }
  async setLastName(lastName) {
    await this.inputLastName.setValue(lastName);
  }
  async setPostalCode(postalCode) {
    await this.inputPostalCode.setValue(postalCode);
  }

  openCheckoutPage() {
    return browser.url("https://www.saucedemo.com/checkout-step-one.html");
  }

  async continueCheckout(firstName, lastName, postalCode) {
    await this.setFirstName(firstName);
    await this.setLastName(lastName);
    await this.setPostalCode(postalCode);
    await this.continueBtn.click();
  }
}

export default new CheckoutFormPage();
