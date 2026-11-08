<div align="center">
  <img src="assets/icons/adaptive-icon.png" width="140" height="140" alt="Pika logo">
  <h1>Pika</h1>
  <p><strong>Personal finance tracker for Android and iOS: expenses, splits with friends, bank SMS capture and AI-assisted entry.</strong></p>

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
    <a href="#builds-and-releases">Builds and releases</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

Pika is a personal finance tracker for income, expenses, transfers, and money
shared with friends. This repository is the mobile app, built with Expo Router
and React Native. It needs a running [pika-v2](https://github.com/e-labInnovations/pika-v2)
server, which it talks to over GraphQL. The same server also has a web
dashboard at `/app` for a laptop.

| Repository | What it is |
| :-- | :-- |
| **pika-app** (this repo) | Android / iOS app (Expo, React Native) |
| [**pika-v2**](https://github.com/e-labInnovations/pika-v2) | Server: web dashboard, API, admin panel, AI, MCP |
| [pika](https://github.com/e-labInnovations/pika) | Pika v1, a WordPress plugin + PWA. Discontinued |

## Features

- 💸 **Transactions**: income, expense and transfer entries with categories,
  tags, people, notes and attachments. Browse history with filters, sorting,
  totals for what matches, a monthly calendar, and CSV export.
- 🤖 **AI assistant**: describe a transaction in a sentence or snap a receipt,
  then check the draft in the normal form. Type `@` to mention people,
  accounts, categories and tags as chips, or ask it to split an expense.
- 🧠 **Category suggestions**: as you type a title, the form suggests a
  category learned from your own history.
- 🤝 **Splits**: split an expense with friends and track who owes you, or split
  one payment into several transactions (rent + electricity) by hand or with AI.
- 📩 **Bank SMS capture** (Android): bank SMS become pending transactions with a
  suggested title, category and split. Review them in the app, or straight from
  the notification. Trusted merchants can be added automatically.
- 📊 **Budgets and insights**: monthly limits per category, and notes on what
  changed this month, on the home screen.
- 📤 **Share into Pika**: share a receipt, screenshot or PDF from another app
  (Google Pay, your bank's app) to start a transaction.
- 📄 **Statement import**: add the transactions a bank statement PDF has and
  Pika doesn't.
- ⚙️ **Your setup**: accounts, nested categories, tags and people, with archive
  for ones you no longer use. Choose the AI provider and model, bring your own
  API key, and create MCP keys so AI assistants can reach your data.
- 🔄 **Updates in the app**: the Android release updates itself, with small
  over-the-air updates for JavaScript changes and new APKs for native ones.
- 🌗 **Light, dark or system theme**, with themed iOS icons.

## Tech stack

| Area | Tools |
| :-- | :-- |
| Framework | [Expo](https://expo.dev) SDK 55, [React Native](https://reactnative.dev) 0.83, React 19 |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| Styling | [Uniwind](https://docs.uniwind.dev/) (Tailwind CSS v4 for React Native) |
| Data | [Apollo Client](https://www.apollographql.com/docs/react/) with [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) |
| Native | Expo Modules in Kotlin: SMS capture, share target, mention input |
| Auth | Google OAuth through the server, tokens in `expo-secure-store` |
| Builds | [EAS Build](https://docs.expo.dev/build/introduction/), [EAS Update](https://docs.expo.dev/eas-update/introduction/), GitHub Actions |

## Getting started

### Prerequisites

- Node.js 20+ (CI uses 24)
- A running [pika-v2](https://github.com/e-labInnovations/pika-v2) server
  (local or hosted)
- An Android device or emulator, or an iOS device or simulator
- An [Expo](https://expo.dev) account and `eas-cli`, to build a development client

Pika uses native modules (SMS, share target, secure store, notifications), so it
runs in a [development build](https://docs.expo.dev/develop/development-builds/introduction/),
not Expo Go. The SMS and share features are Android-only.

### Setup

```sh
git clone https://github.com/e-labInnovations/pika-app.git
cd pika-app
npm install

# Build and install a development client once (and again after native changes)
eas build --profile development --platform android

# Then start Metro and open the app on your device
npm run start
```

Install packages from the public registry (`--registry=https://registry.npmjs.org`
if your npm points elsewhere). A private registry URL in `package-lock.json`
makes EAS builds fail.

### Pointing at a server

The app reads the API URL from `EXPO_PUBLIC_API_URL`, which defaults to
`http://localhost:3333`, the pika-v2 dev server.

```sh
EXPO_PUBLIC_API_URL=http://192.168.1.10:3333 npm run start
```

On a physical device, use your computer's LAN IP instead of `localhost`.

### GraphQL types

GraphQL operations live next to each domain in `src/services/gql/**/*.gql`.
After adding or changing one, or after a server schema change, regenerate the
types against a running server:

```sh
EXPO_PUBLIC_API_URL=http://localhost:3333 npm run codegen
```

### Scripts

| Command | Does |
| :-- | :-- |
| `npm run start` | Start Metro for the development client |
| `npm run android` / `npm run ios` | Start Metro and open on a device |
| `npm run codegen` | Regenerate GraphQL types from the server schema |
| `npm test` | Unit tests (Node's test runner) |
| `npm run generate:icons` | Regenerate the Lucide icon data |

The Kotlin modules have their own tests, run by the **Android unit tests**
workflow.

## Project structure

```
src/
├── app/              Expo Router routes
│   ├── (public)/       sign-in and OAuth callback
│   └── (protected)/    tabs (home, transactions, add, people, settings),
│                       analytics, transaction, person, SMS and settings screens
├── components/       UI components, grouped by feature
├── context/          auth, AI prefill bridge, share-intent bridge
├── services/gql/     .gql operations per domain, generated types in types/
├── lib/              tokens, storage, uploads, formatting, notifications, updates
└── theme/            colour values for places className can't reach
modules/              native Expo modules (Kotlin)
├── pika-sms/           bank SMS capture, upload and notifications
├── pika-share/         share target (images, PDFs, text from other apps)
└── pika-composer/      text input with mention chips
assets/               app icons and splash images
docs/RELEASING.md     how releases and in-app updates work
```

Styling conventions and design tokens are documented in [CLAUDE.md](CLAUDE.md).

## Builds and releases

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
```

The Android release is an APK installed outside the Play Store, which updates
itself. Two GitHub Actions workflows publish it:

| Change | Workflow | Result |
| :-- | :-- | :-- |
| JavaScript only | **Publish OTA update** | An EAS Update; the app downloads it and offers a restart |
| Native code, packages or config | **Release APK** | A new version (patch number up by default), built on EAS and attached to a GitHub release; the app offers to install it |

Either can be marked **mandatory**, so older installs update before they can be
used. Setup, signing keys and details: [docs/RELEASING.md](docs/RELEASING.md).

## Contributing

Contributions are welcome: bug reports, fixes, and UI improvements.

1. Fork the repo and create a branch: `git checkout -b feat/my-change`
2. Follow the styling rules in [CLAUDE.md](CLAUDE.md): `className` with
   Uniwind tokens, no `StyleSheet.create`.
3. If you change GraphQL operations, run `npm run codegen` and commit the
   generated types.
4. Check with `npx tsc --noEmit` and `npm test`.
5. Use [Conventional Commits](https://www.conventionalcommits.org)
   (`feat:`, `fix:`, `docs:` …) and open a pull request. Include a screenshot
   for UI changes.

Changes that need new API fields belong in
[pika-v2](https://github.com/e-labInnovations/pika-v2) first.

## License

[MIT](LICENSE) © [e-Lab Innovations](https://elabins.com)
