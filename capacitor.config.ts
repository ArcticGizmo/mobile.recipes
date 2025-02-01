import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'mobile.recipes',
  appName: 'Recipes',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    CapacitorCookies: {
      enabled: true
    },
    Keyboard: {
      resize: KeyboardResize.Body,
      resizeOnFullScreen: true
    }
  }
};

export default config;
