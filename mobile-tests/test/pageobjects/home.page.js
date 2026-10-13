import { $ } from '@wdio/globals';

class HomePage {
  get homeTab() {
    return $('~Home');
  }

  async isDisplayed() {
    return this.homeTab.isDisplayed();
  }

  async open() {
    await this.homeTab.click();
  }
}

export default new HomePage();
