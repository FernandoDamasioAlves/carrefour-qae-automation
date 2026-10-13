import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import {
  testData,
  validateTestEnvironment
} from '../config/test-data.js';

describe('Banco Carrefour | Validação de Login', () => {

  it('MOB-004 | deve rejeitar e-mail inválido', async () => {
    validateTestEnvironment();

    await LoginPage.open();

    await LoginPage.fillCredentials(
      'email-invalido',
      testData.login.password
    );

    await LoginPage.submit();

    await expect(LoginPage.loginErrorAlert).toBeDisplayed();
  });

});
