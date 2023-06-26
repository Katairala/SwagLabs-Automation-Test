class Footer {
  get twBtn() {
    return $("#page_wrapper > footer > ul > li.social_twitter > a");
  }

  get fbBtn() {
    return $("#page_wrapper > footer > ul > li.social_facebook > a");
  }

  get linkedinBtn() {
    return $("#page_wrapper > footer > ul > li.social_linkedin > a");
  }

  async clickTwitterButton() {
    await this.twBtn.click();
  }

  async clickFacebookButton() {
    await this.fbBtn.click();
  }

  async clickLinkedInButton() {
    await this.linkedinBtn.click();
  }
}

export default new Footer();
