import LoginPage from "../pageobjects/login.page.js";
import ProductsPage from "../pageobjects/productspage.js";
import CartPage from "../pageobjects/cartpage.js";
import CheckoutFormPage from "../pageobjects/checkoutForm.js";
import CheckoutStepTwo from "../pageobjects/checkoutstep2.js";
import CheckoutStepThree from "../pageobjects/checkoutstep3.js";
import MenuPage from "../pageobjects/sideBarMenu.js";
import Footer from "../pageobjects/footer.js";

beforeAll(() => {
  LoginPage.open();
  LoginPage.login("problem_user", "secret_sauce");
});

describe("Product page for problem user", () => {
  it("should click on social media icons", async () => {
    await browser.execute(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await Footer.clickTwitterButton();
    await Footer.clickFacebookButton();
    await Footer.clickLinkedInButton();
  });

  it("Add items to cart", async () => {
    await ProductsPage.openProductsPage();
    await ProductsPage.addToCart(ProductsPage.addBackpackBtn);
    await ProductsPage.addToCart(ProductsPage.addBikeBtn);
    await ProductsPage.addToCart(ProductsPage.addShirtBtn);
    await expect(ProductsPage.cartBtn).toHaveText("3");
  });

  it("Removing items from cart", async () => {
    await ProductsPage.removeFromCart(ProductsPage.removeBackpackBtn);
    await expect(ProductsPage.cartBtn).toHaveText("2");
    await ProductsPage.removeFromCart(ProductsPage.removeBikeBtn);
    await expect(ProductsPage.cartBtn).toHaveText("1");
  });
});

describe("Cart Page for problem user", () => {
  beforeAll(() => {
    ProductsPage.openProductsPage();
    ProductsPage.addToCart(ProductsPage.addBackpackBtn);
  });

  it('should go back when clicking "Continue Shopping"', async () => {
    CartPage.openCart();
    await CartPage.continueShopBtn.click();
    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl === "https://www.saucedemo.com/inventory.html";
    });
  });

  it("should go to the checkout page", async () => {
    CartPage.openCart();
    await CartPage.checkoutBtn.click();
    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl === "https://www.saucedemo.com/checkout-step-one.html";
    });
  });
});

describe("Checkout form page negative cases problem user", () => {
  beforeEach("Log in and add to cart", () => {
    ProductsPage.openProductsPage();
    ProductsPage.addToCart(ProductsPage.addBackpackBtn);
    CartPage.openCart();
    CartPage.checkoutBtn.click();
  });

  describe("Negative case with empty form information", () => {
    it("Should show an error with empty fields", async () => {
      await CheckoutFormPage.openCheckoutPage();
      await CheckoutFormPage.continueCheckout("", "", "");
      await expect(CheckoutFormPage.checkoutErrorMssge).toHaveText(
        "Error: First Name is required"
      );
    });

    it("Should show an error with empty name", async () => {
      await CheckoutFormPage.openCheckoutPage();
      await CheckoutFormPage.continueCheckout("", "Lastname", "11700");
      await expect(CheckoutFormPage.checkoutErrorMssge).toHaveText(
        "Error: First Name is required"
      );
    });

    it("Should show an error with empty last name", async () => {
      await CheckoutFormPage.openCheckoutPage();
      await CheckoutFormPage.continueCheckout("Name", "", "11700");
      await expect(CheckoutFormPage.checkoutErrorMssge).toHaveText(
        "Error: Last Name is required"
      );
    });

    it("Should show an error with empty zip", async () => {
      await CheckoutFormPage.openCheckoutPage();
      await CheckoutFormPage.continueCheckout("Name", "Lasname", "");
      await expect(CheckoutFormPage.checkoutErrorMssge).toHaveText(
        "Error: Postal Code is required"
      );
    });
  });
});

describe("Click on cancel on form page problem user", () => {
  it("Should go back to the cart page", async () => {
    await CheckoutFormPage.cancelBtn.click();
    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl === "https://www.saucedemo.com/cart.html";
    });
  });
});

describe("Checkout form positive test cases problem user", () => {
  beforeEach("Log in and add to cart", () => {
    ProductsPage.openProductsPage();
    ProductsPage.addToCart(ProductsPage.addBackpackBtn);
    CartPage.openCart();
    CartPage.checkoutBtn.click();
  });
  describe("Positive form cases", () => {
    it("It should pass the checkout", async () => {
      await CheckoutFormPage.openCheckoutPage();
      await CheckoutFormPage.continueCheckout("Name", "Lastname", "11700");
      await expect(browser).toHaveUrl(
        "https://www.saucedemo.com/checkout-step-two.html"
      );
    });
  });
});

describe("Checkout step two problem user", () => {
  beforeAll(() => {
    ProductsPage.openProductsPage();
    ProductsPage.addToCart(ProductsPage.addBackpackBtn);
    CartPage.openCart();
    CartPage.checkoutBtn.click();
    CheckoutFormPage.continueCheckout("Name", "Lastname", "11700");
    CheckoutFormPage.continueBtn.click();
  });
  it('should go back when clicking "Cancel"', async () => {
    CheckoutStepTwo.openCheckoutStepTwo();
    await CheckoutStepTwo.cancelTwoBtn.click();
    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl === "https://www.saucedemo.com/inventory.html";
    });
  });
  it('It should continue the checkout when clicking "finish', async () => {
    CheckoutStepTwo.openCheckoutStepTwo();
    await CheckoutStepTwo.finishBtn.click();
    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl === "https://www.saucedemo.com/checkout-complete.html";
    });
  });
});

describe("Checkout step three problem user", () => {
  beforeAll(() => {
    ProductsPage.openProductsPage();
    ProductsPage.addToCart(ProductsPage.addBackpackBtn);
    CartPage.openCart();
    CartPage.checkoutBtn.click();
    CheckoutFormPage.continueCheckout("Name", "Lastname", "11700");
    CheckoutFormPage.continueBtn.click();
    CheckoutStepTwo.openCheckoutStepTwo();
    CheckoutStepTwo.finishBtn.click();
  });
  it("should go back to the product page when clicking back home", async () => {
    CheckoutStepThree.openCheckoutStepThree();
    await CheckoutStepThree.homeBtn.click();
    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl === "https://www.saucedemo.com/inventory.html";
    });
  });
});

describe("Logout problem user", () => {
  it("Should log out when clicking on 'Logout'", async () => {
    await MenuPage.logout();
    await expect(browser).toHaveUrl("https://www.saucedemo.com/");
  });
});
