<div align="center">
  <img src="assets/icons/adaptive-icon.png" width="140" height="140" alt="Pika logo">
  <h1>Pika</h1>
  <p><strong>Personal finance tracker for Android and iOS: expenses, splits with friends, and AI-assisted entry.</strong></p>

  <p>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
    <a href="https://expo.dev"><img src="https://img.shields.io/badge/Expo-SDK%2055-000020.svg?logo=expo&logoColor=white" alt="Expo SDK 55"></a>
    <a href="https://reactnative.dev"><img src="https://img.shields.io/badge/React%20Native-0.83-61dafb.svg?logo=react&logoColor=black" alt="React Native 0.83"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178c6.svg?logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://graphql.org"><img src="https://img.shields.io/badge/GraphQL-Apollo-e10098.svg?logo=graphql&logoColor=white" alt="GraphQL"></a>
    <img src="https://img.shields.io/badge/platform-Android%20%7C%20iOS-lightgrey.svg" alt="Platform: Android | iOS">
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting started</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#building">Building</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

Pika is a personal finance tracker for income, expenses, transfers, and money
shared with friends. This repository is the mobile app, built with Expo Router
and React Native. It needs a running [pika-v2](https://github.com/e-labInnovations/pika-v2)
backend, which it talks to over GraphQL.

| Repository | What it is |
| :-- | :-- |
| **pika-app** (this repo) | Android / iOS app (Expo, React Native) |
| [**pika-v2**](https://github.com/e-labInnovations/pika-v2) | Backend: API, admin panel, AI, MCP |
| [pika](https://github.com/e-labInnovations/pika) | Pika v1, a WordPress plugin + PWA. Discontinued |

## Features

- 💸 **Transactions**: income, expense and transfer entries with categories,
  tags, people, notes, and receipt or document attachments. Browse history
  with filters or by month on a calendar.
- 🤖 **AI assistant**: describe a transaction in a sentence or snap a receipt,
  then review the draft in the normal form. Mention people, accounts,
  categories and tags directly in the prompt, or ask it to split an expense.
- 🧠 **Category suggestions**: as you type a title, the form suggests a
  category learned from your own history.
- 🤝 **Splits**: split an expense with friends, see each friend's share in
  their transaction list, and track who owes you.
- 📊 **Analytics**: monthly spending by category, tag and person, on the home
  screen and in full views.
- 📤 **Share into Pika**: share a receipt image or file from another app to
  start a transaction.
- ⚙️ **Your setup**: manage accounts, nested categories and tags. Choose the AI
  provider and model, bring your own API key, and create MCP keys so AI
  assistants can reach your data.
- 🌗 **Light, dark or system theme**, with themed iOS icons.

## Tech stack

| Area | Tools |
| :-- | :-- |
| Framework | [Expo](https://expo.dev) SDK 55, [React Native](https://reactnative.dev) 0.83, React 19 |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| Styling | [Uniwind](https://docs.uniwind.dev/) (Tailwind CSS v4 for React Native) |
| Data | [Apollo Client](https://www.apollographql.com/docs/react/) with [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) |
| Auth | Google OAuth through the backend, tokens in `expo-secure-store` |
| Builds | [EAS Build](https://docs.expo.dev/build/introduction/) |

## Getting started

### Prerequisites

- Node.js 20+
- A running [pika-v2](https://github.com/e-labInnovations/pika-v2) backend
  (local or hosted)
- An Android device or emulator, or an iOS device or simulator
- An [Expo](https://expo.dev) account and `eas-cli`, to build a development client

Pika uses native modules (share intent, secure store, notifications), so it
runs in a [development build](https://docs.expo.dev/develop/development-builds/introduction/),
not Expo Go.

### Setup

```sh
git clone https://github.com/e-labInnovations/pika-app.git
cd pika-app
npm install

# Build and install a development client once (or after native changes)
eas build --profile development --platform android

# Then start Metro and open the app on your device
npm run start
```

### Pointing at a backend

The app reads the API URL from `EXPO_PUBLIC_API_URL`, which defaults to
`http://localhost:3333`, the pika-v2 dev server.

```sh
EXPO_PUBLIC_API_URL=http://192.168.1.10:3333 npm run start
```

On a physical device, use your computer's LAN IP instead of `localhost`.

### GraphQL types

GraphQL operations live next to each domain in `src/services/gql/**/*.gql`.
After adding or changing one, or after a backend schema change, regenerate the
types against a running backend:

```sh
EXPO_PUBLIC_API_URL=http://localhost:3333 npm run codegen
```

### Scripts

| Command | Does |
| :-- | :-- |
| `npm run start` | Start Metro for the development client |
| `npm run android` / `npm run ios` | Start Metro and open on a device |
| `npm run codegen` | Regenerate GraphQL types from the backend schema |
| `npm run generate:icons` | Regenerate the Lucide icon data |

## Project structure

```
src/
├── app/              Expo Router routes
│   ├── (public)/     sign-in and OAuth callback
│   └── (protected)/  tabs (home, transactions, add, people, settings),
│                     analytics, transaction / person / settings screens
├── components/       UI components, grouped by feature
├── context/          auth, AI prefill bridge, share-intent bridge
├── services/gql/     .gql operations per domain, generated types in types/
├── lib/              tokens, storage, uploads, formatting, notifications
└── theme/            colour values for places className can't reach
assets/               app icons and splash images
```

Styling conventions and design tokens are documented in [CLAUDE.md](CLAUDE.md).

## Building

`app.config.js` switches on `APP_ENV`, so a development build and a release
build can be installed side by side:

| | `APP_ENV=development` | Production |
| :-- | :-- | :-- |
| Package | `com.elabins.pika.dev` | `com.elabins.pika` |
| App name | Pika (Dev) | Pika |

```sh
eas build --profile development --platform android     # dev client APK
eas build --profile development --platform ios
eas build --profile development-simulator --platform ios
eas build --profile production-apk --platform android  # release APK
```

The `development` profiles set `APP_ENV` and `EXPO_PUBLIC_API_URL` in
[`eas.json`](eas.json). The production profiles set neither, so set
`EXPO_PUBLIC_API_URL` as an EAS environment variable. Without it, the build
points at `http://localhost:3333`.

## Contributing

Contributions are welcome: bug reports, fixes, and UI improvements.

1. Fork the repo and create a branch: `git checkout -b feat/my-change`
2. Follow the styling rules in [CLAUDE.md](CLAUDE.md): `className` with
   Uniwind tokens, no `StyleSheet.create`.
3. If you change GraphQL operations, run `npm run codegen` and commit the
   generated types.
4. Check types with `npx tsc --noEmit`.
5. Use [Conventional Commits](https://www.conventionalcommits.org)
   (`feat:`, `fix:`, `docs:` …) and open a pull request. Include a screenshot
   for UI changes.

Changes that need new API fields belong in
[pika-v2](https://github.com/e-labInnovations/pika-v2) first.

## License

[MIT](LICENSE) © [e-Lab Innovations](https://elabins.com)
