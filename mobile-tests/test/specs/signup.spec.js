import { expect } from '@wdio/globals';
import SignUpPage from '../pageobjects/signup.page.js';

describe('Banco Carrefour | Cadastro Mobile', () => {

  it('MOB-005 | deve acessar o formulário de cadastro', async () => {
    await SignUpPage.open();

    await expect($('~input-email')).toBeDisplayed();
    await expect($('~input-password')).toBeDisplayed();
  });

});
