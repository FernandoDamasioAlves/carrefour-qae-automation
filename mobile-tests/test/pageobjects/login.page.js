import { $ } from '@wdio/globals';

class LoginPage {
  get loginTab() {
    return $('~Login');
  }

  get emailInput() {
    return $('~input-email');
  }

  get passwordInput() {
    return $('~input-password');
  }

  get loginButton() {
    return $('~button-LOGIN');
  }

  async open() {
    await this.loginTab.click();
    await this.emailInput.waitForDisplayed();
  }

  async fillCredentials(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
  }

  get loginSuccessAlert() {
    return $('android=new UiSelector().textContains("Success")');
  }

  get loginErrorAlert() {
    return $('android=new UiSelector().textContains("Please enter a valid email")');
  }

  async submit() {
    await this.loginButton.click();
  }
}

export default new LoginPage();
