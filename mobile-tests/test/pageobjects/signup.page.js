import { $ } from '@wdio/globals';

class SignUpPage {
  get loginTab() {
    return $('~Login');
  }

  get signUpTab() {
    return $('~button-sign-up-container');
  }

  get emailInput() {
    return $('~input-email');
  }

  get passwordInput() {
    return $('~input-password');
  }

  get confirmPasswordInput() {
    return $('~input-repeat-password');
  }

  async open() {
    await this.loginTab.click();
    await this.signUpTab.waitForDisplayed();
    await this.signUpTab.click();
    await this.confirmPasswordInput.waitForDisplayed();
  }

  async fillRegistration(email, password, confirmation) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.confirmPasswordInput.setValue(confirmation);
  }
}

export default new SignUpPage();
