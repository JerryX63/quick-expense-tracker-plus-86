
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.59e4acb9b07a4b11b3b0869b102aacf3',
  appName: 'quick-expense-tracker-plus-86',
  webDir: 'dist',
  server: {
    url: 'https://59e4acb9-b07a-4b11-b3b0-869b102aacf3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
      keystorePassword: null,
      keystoreAliasPassword: null,
      releaseType: null,
      signingConfig: null
    }
  }
};

export default config;
