import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';

describe('Banco Carrefour | Navegação Mobile', () => {
  it('MOB-001 | deve exibir a tela inicial do aplicativo', async () => {
    await expect(HomePage.homeTab).toBeDisplayed();
  });
});
