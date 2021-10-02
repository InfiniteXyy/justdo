import 'dotenv/config'

export default {
  name: 'justdo-plus',
  slug: 'justdo-plus',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  owner: 'justorg',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.infinitex.justdoplus',
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  extra: {
    devAuthToken: process.env.DEV_AUTH_TOKEN,
    devDatabaseId: process.env.DEV_DATABASE_ID,
  },
}
