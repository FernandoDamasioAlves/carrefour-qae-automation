import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';

describe('Banco Carrefour | Validação de Login', () => {

  it('MOB-004 | deve rejeitar e-mail inválido', async () => {
    await LoginPage.open();

    await LoginPage.fillCredentials(
      'email-invalido',
      'Teste@123456'
    );

    await LoginPage.submit();

    await expect(LoginPage.loginErrorAlert).toBeDisplayed();
  });

});
