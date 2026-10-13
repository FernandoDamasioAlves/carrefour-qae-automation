import { $ } from '@wdio/globals';

class FormsPage {
  get formsTab() {
    return $('~Forms');
  }

  get formsScreen() {
    return $('~Forms-screen');
  }

  get textInput() {
    return $('~text-input');
  }

  get textResult() {
    return $('~input-text-result');
  }

  get switchControl() {
    return $('~switch');
  }

  get switchMessage() {
    return $('~switch-text');
  }

  get dropdown() {
    return $('~Dropdown');
  }

  async open() {
    const formsVisible = await this.formsTab.isDisplayed().catch(() => false);

    if (!formsVisible) {
      await driver.back();

      await this.formsTab.waitForDisplayed({ timeout: 10000 });
    }

    await this.formsTab.click();
    await this.formsScreen.waitForDisplayed({ timeout: 10000 });
  }

  async enterText(value) {
    await this.textInput.setValue(value);
  }

  async toggleSwitch() {
    await this.switchControl.click();
  }

  async openDropdown() {
    await this.dropdown.click();
  }
}

export default new FormsPage();
