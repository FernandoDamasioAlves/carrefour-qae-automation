import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import {
  testData,
  validateTestEnvironment
} from '../config/test-data.js';

describe('Banco Carrefour | Autenticação Mobile', () => {

  it('MOB-002 | deve acessar a tela de Login', async () => {
    await LoginPage.open();

    await expect(LoginPage.emailInput).toBeDisplayed();
    await expect(LoginPage.passwordInput).toBeDisplayed();
    await expect(LoginPage.loginButton).toBeDisplayed();
  });

  it('MOB-003 | deve permitir preencher credenciais', async () => {
    validateTestEnvironment();

    await LoginPage.open();

    await LoginPage.fillCredentials(
      testData.login.email,
      testData.login.password
    );

    await expect(LoginPage.emailInput)
      .toHaveText(testData.login.email);
  });
});
