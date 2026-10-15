import 'dotenv/config';

export const config = {
  runner: 'local',

  logLevel: 'error',

  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  specs: ['./test/specs/**/*.spec.js'],

  maxInstances: 1,
  maxInstancesPerCapability: 1,

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Carrefour_QAE_API35',
    'appium:udid': process.env.ANDROID_UDID || 'emulator-5554',
    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': '.MainActivity',
    'appium:noReset': false,
    'appium:uiautomator2ServerLaunchTimeout': 90000,
    'appium:appWaitDuration': 60000
  }],

  framework: 'mocha',

  reporters: [
    'spec',
    ['allure', {
      outputDir: './allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],

  mochaOpts: {
    timeout: 60000
  },

  waitforTimeout: 15000,

  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,

  afterTest: async function (_test, _context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  }
};
