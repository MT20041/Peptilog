import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'PeptiLog',
  slug: 'PeptiLog',
  scheme: 'peptilog',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'dark',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.peptilog.app',
  },
  android: {
    edgeToEdgeEnabled: true,
    package: 'com.peptilog.app',
  },
  web: {
    bundler: 'metro',
    output: 'static',
  },
  experiments: {
    typedRoutes: true,
    baseUrl: '/PeptiLog',
  },
  plugins: ['expo-router'],
  extra: {
    disclaimer:
      'PeptiLog is a personal record-keeping tool for private tracking. It does not provide medical advice, dosing guidance, diagnosis, or treatment recommendations.',
  },
};

export default config;
