import 'dotenv/config';

export const testData = Object.freeze({
  login: {
    email: process.env.MOBILE_TEST_EMAIL,
    password: process.env.MOBILE_TEST_PASSWORD
  },

  invalidLogin: {
    email: 'email-invalido'
  }
});

export function validateTestEnvironment() {
  if (!testData.login.email || !testData.login.password) {
    throw new Error(
      'Variáveis MOBILE_TEST_EMAIL e MOBILE_TEST_PASSWORD não configuradas.'
    );
  }
}
