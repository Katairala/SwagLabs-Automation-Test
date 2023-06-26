import LoginPage from "../pageobjects/login.page.js";

describe("Negative login cases", () => {
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

describe("Positive login cases", () => {
  it("Login should be successful with standard_user data", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory.html"
    );
  });

  it("Login should not be successful with locked_out_user data", async () => {
    await LoginPage.open();
    await LoginPage.login("locked_out_user", "secret_sauce");
    await expect(LoginPage.errorMge).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  it("Login should be successful but has problems with problem_user data", async () => {
    await LoginPage.open();
    await LoginPage.login("problem_user", "secret_sauce");
    await expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory.html"
    );
  });

  it("Login should be successful but has a glitch using performance_glitch_user data", async () => {
    await LoginPage.open();
    await LoginPage.login("performance_glitch_user", "secret_sauce");
    await expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory.html"
    );
  });
});