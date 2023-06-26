class MenuPage {
    get menuBtn() {
      return $("#react-burger-menu-btn");
    }
    get logoutBtn() {
      return $("#logout_sidebar_link");
    }
    
      async logout() {
        await this.menuBtn.click();
        await this.logoutBtn.click();
      }
    }
  export default new MenuPage();