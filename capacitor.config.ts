import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.k9.calendar.test',
  appName: 'K9 Calendar',
  webDir: 'www',
  bundledWebRuntime: false,
  ios: {
    contentInset: 'automatic'
  }
};

export default config;
