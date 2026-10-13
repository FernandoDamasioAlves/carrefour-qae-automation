import 'dotenv/config';
import { config as androidConfig } from './wdio.conf.js';

const appPath = process.env.IOS_APP_PATH;

if (!appPath) {
  throw new Error(
    'Configure IOS_APP_PATH com o caminho do aplicativo iOS (.app ou .ipa).'
  );
}

const iosCapability = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 16',
  'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '18.0',
  'appium:app': appPath,
  'appium:noReset': false
};

if (process.env.IOS_UDID) {
  iosCapability['appium:udid'] = process.env.IOS_UDID;
}

export const config = {
  ...androidConfig,
  capabilities: [iosCapability],
  maxInstances: 1,
  maxInstancesPerCapability: 1
};
