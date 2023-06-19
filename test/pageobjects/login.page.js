class LoginPage {
  get inputUsername() {
    return $("#user-name");
  }
  get inputPassword() {
    return $("#password");
  }
  get btnLogin() {
    return $("#login-button");
  }
  get errorMge() {
    return $(
      "#login_button_container > div > form > div.error-message-container.error"
    );
  }

  async setUsername(username) {
    await this.inputUsername.setValue(username);
  }
  async setPassword(password) {
    await this.inputPassword.setValue(password);
  }

  async login(username, password) {
    await this.setUsername(username);
    await this.setPassword(password);
    await this.btnLogin.click();
  }

  open() {
    return browser.url("https://www.saucedemo.com/");
  }
}

export default new LoginPage();
