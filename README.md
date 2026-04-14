# Pika

Pika is a mobile application built with React Native and Expo Router. It helps you manage transactions by using your device's camera and photo library to scan and attach receipts and bills.

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) & [React Native](https://reactnative.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: [Uniwind](https://docs.uniwind.dev/)
- **Build System**: [EAS Build](https://docs.expo.dev/build/introduction/)

## Development Setup

1. **Install Dependencies**

   ```sh
   npm install
   ```

   _or `pnpm install`_

2. **Run Locally (Development Server)**
   ```sh
   npm run start
   ```
   _or `npx expo start`_

### Environments & App Config

The app configuration has been migrated to `app.config.js` to support dynamic environment settings.

The project uses `eas.json` profiles to handle environment variables seamlessly. When building for development, the `development` profile automatically injects `APP_ENV=development` and connects to the production API by default (`EXPO_PUBLIC_API_URL`).

- **Development (`APP_ENV=development`)**
  - Uses the package identifier: `com.elabins.pika.dev`
  - Installs on your device as: `Pika (Dev)`
- **Production**
  - Uses the package identifier: `com.elabins.pika`
  - Installs on your device as: `Pika`

## Deployment & Builds

This project uses Expo Application Services (EAS).

- **Build Development Client (Android):**

  ```sh
  eas build --profile development --platform android
  ```

  _(Note: No need to explicitly pass `APP_ENV=development` as it handles it automatically via `eas.json`)_

- **Build Development Client (iOS):**

  ```sh
  eas build --profile development --platform ios
  ```

- **Build Production Client (Android APK):**
  ```sh
  eas build --profile production-apk --platform android
  ```

---

_Created by [e-Lab Innovations](https://elabins.com)_
