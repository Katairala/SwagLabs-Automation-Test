import LoginPage from "../pageobjects/login.page.js";

describe("Negative login cases", () => {
  describe("Empty fields", () => {
    it("Should show an error message because all fields are empty", async () => {
      await LoginPage.open();
      await LoginPage.login("", "");
      await expect(LoginPage.errorMge).toHaveText(
        "Epic sadface: Username is required"
      );
    });
    it("Should show an error because username is empty", async () => {
      await LoginPage.open();
      await LoginPage.login("", "secret_sauce");
      await expect(LoginPage.errorMge).toHaveText(
        "Epic sadface: Username is required"
      );
    });
    it("Should show an error because password is empty", async () => {
      await LoginPage.open();
      await LoginPage.login("standard_user", "");
      await expect(LoginPage.errorMge).toHaveText(
        "Epic sadface: Password is required"
      );
    });
  });
  describe("Invalid data", () => {
    it("Should show an error message because username is not valid", async () => {
      await LoginPage.open();
      await LoginPage.login("invalid", "secret_sauce");
      await expect(LoginPage.errorMge).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      );
    });
    it("Should show an error message because password is not valid", async () => {
      await LoginPage.open();
      await LoginPage.login("standard_user", "invalid");
      await expect(LoginPage.errorMge).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      );
    });
  });
});

describe("Positive login cases", () => {
  describe("With standard_user data", () => {
    it("Login should be successful", async () => {
      await LoginPage.open();
      await LoginPage.login("standard_user", "secret_sauce");
      await expect(browser).toHaveUrl(
        "https://www.saucedemo.com/inventory.html"
      );
    });
  });
  describe("With locked_out_user data", () => {
    it("Login should not be successful", async () => {
      await LoginPage.open();
      await LoginPage.login("locked_out_user", "secret_sauce");
      await expect(LoginPage.errorMge).toHaveText(
        "Epic sadface: Sorry, this user has been locked out."
      );
    });
  });
  describe("With problem_user data", () => {
    it("Login should be successful but has problems", async () => {
      await LoginPage.open();
      await LoginPage.login("problem_user", "secret_sauce");
      await expect(browser).toHaveUrl(
        "https://www.saucedemo.com/inventory.html"
      );
    });
  });
  describe("Using performance_glitch_user data", () => {
    it("Login should be successful but has a glitch", async () => {
      await LoginPage.open();
      await LoginPage.login("performance_glitch_user", "secret_sauce");
      await expect(browser).toHaveUrl(
        "https://www.saucedemo.com/inventory.html"
      );
    });
  });
});
