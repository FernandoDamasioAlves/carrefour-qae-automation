import { $, expect } from '@wdio/globals';
import FormsPage from '../pageobjects/forms.page.js';

describe('Banco Carrefour | Formulários Mobile', () => {

  it('MOB-008 | deve preencher e apresentar o texto digitado', async () => {
    await FormsPage.open();

    const text = 'Automacao Mobile QA';

    await FormsPage.enterText(text);

    await expect(FormsPage.textInput)
      .toHaveText(text);

    await expect(FormsPage.textResult)
      .toHaveText(text);
  });

  it('MOB-009 | deve alternar o switch e atualizar a mensagem', async () => {
    await FormsPage.open();

    const initialMessage = await FormsPage.switchMessage.getText();

    const validMessages = [
      'Click to turn the switch ON',
      'Click to turn the switch OFF'
    ];

    expect(validMessages).toContain(initialMessage);

    const expectedMessage = initialMessage.endsWith('ON')
      ? 'Click to turn the switch OFF'
      : 'Click to turn the switch ON';

    try {
      await FormsPage.toggleSwitch();

      await expect(FormsPage.switchMessage)
        .toHaveText(expectedMessage);
    } finally {
      const currentMessage = await FormsPage.switchMessage.getText();

      if (currentMessage !== initialMessage) {
        await FormsPage.toggleSwitch();
      }
    }

    await expect(FormsPage.switchMessage)
      .toHaveText(initialMessage);
  });

  it('MOB-010 | deve abrir o dropdown de opções', async () => {
    await FormsPage.open();

    await FormsPage.openDropdown();

    try {
      await expect($('android=new UiSelector().text("webdriver.io is awesome")'))
        .toBeDisplayed();
    } finally {
      await driver.back();
    }
  });

});
