const IS_DEV = process.env.APP_ENV === 'development';
const appPackage = IS_DEV ? 'com.elabins.pika.dev' : 'com.elabins.pika';

export default {
  expo: {
    name: IS_DEV ? 'Pika (Dev)' : 'Pika',
    slug: 'pika',
    scheme: 'pika',
    version: '1.1.1',
    // OTA updates (EAS Update) only reach builds with the same native code.
    runtimeVersion: { policy: 'fingerprint' },
    updates: {
      url: 'https://u.expo.dev/22e0e671-4565-4627-b55c-c682985bce0d',
      checkAutomatically: 'ON_LOAD',
      fallbackToCacheTimeout: 0,
    },
    orientation: 'portrait',
    userInterfaceStyle: 'dark',
    icon: './assets/icons/ios-light.png',
    ios: {
      supportsTablet: false,
      bundleIdentifier: appPackage,
      icon: {
        light: './assets/icons/ios-light.png',
        dark: './assets/icons/ios-dark.png',
        tinted: './assets/icons/ios-tinted.png',
      },
      infoPlist: {
        NSCameraUsageDescription: 'Pika uses the camera to scan receipts and bills.',
        NSPhotoLibraryUsageDescription:
          'Pika accesses your photos to attach receipts to transactions.',
      },
      entitlements: {
        'aps-environment': 'development',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/icons/adaptive-icon.png',
        backgroundColor: '#0d1322',
      },
      package: appPackage,
      permissions: [
        'android.permission.CAMERA',
        'android.permission.READ_MEDIA_IMAGES',
        // Self-update: open the installer for an APK downloaded from a GitHub release.
        'android.permission.REQUEST_INSTALL_PACKAGES',
      ],
      // Contacts are only read (import people); expo-contacts would also add WRITE_CONTACTS.
      blockedPermissions: ['android.permission.WRITE_CONTACTS'],
    },
    web: {
      output: 'static',
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-secure-store',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#0d1322',
          image: './assets/icons/splash-icon-dark.png',
          imageWidth: 180,
          resizeMode: 'contain',
          dark: {
            image: './assets/icons/splash-icon-dark.png',
            backgroundColor: '#0d1322',
          },
          light: {
            image: './assets/icons/splash-icon-light.png',
            backgroundColor: '#f4f6ff',
          },
        },
      ],
      [
        'expo-notifications',
        {
          icon: './assets/icons/adaptive-icon.png',
          color: '#4d8eff',
          defaultChannel: 'default',
          sounds: [],
        },
      ],
      './modules/pika-share/app.plugin.js',
      [
        'expo-contacts',
        { contactsPermission: 'Pika reads your contacts only when you import people from them.' },
      ],
      'expo-web-browser',
      'expo-sharing',
    ],
    extra: {
      eas: {
        projectId: '22e0e671-4565-4627-b55c-c682985bce0d',
      },
      router: {},
    },
    owner: 'elabinnovations',
  },
};
