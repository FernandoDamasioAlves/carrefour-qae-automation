import { expect } from '@wdio/globals';
import SignUpPage from '../pageobjects/signup.page.js';
import {
  testData,
  validateTestEnvironment
} from '../config/test-data.js';

describe('Banco Carrefour | Validações de Cadastro', () => {

  it('MOB-006 | deve apresentar os campos obrigatórios', async () => {
    await SignUpPage.open();

    await expect(SignUpPage.emailInput).toBeDisplayed();
    await expect(SignUpPage.passwordInput).toBeDisplayed();
    await expect(SignUpPage.confirmPasswordInput).toBeDisplayed();
  });

  it('MOB-007 | deve permitir preencher os dados de cadastro', async () => {
    validateTestEnvironment();

    await SignUpPage.open();

    await SignUpPage.fillRegistration(
      testData.login.email,
      testData.login.password,
      `${testData.login.password}X`
    );

    await expect(SignUpPage.emailInput)
      .toHaveText(testData.login.email);

    await expect(SignUpPage.confirmPasswordInput)
      .toBeDisplayed();
  });

});
