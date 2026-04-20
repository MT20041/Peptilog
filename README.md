# PeptiLog

PeptiLog is a production-ready Expo MVP for private peptide record-keeping. It focuses on fast logging, site visibility, personal notes, and per-user Firebase storage across mobile and web.

## Disclaimer

PeptiLog is a personal record-keeping tool for private tracking. It does not provide medical advice, dosing guidance, diagnosis, or treatment recommendations.

## Screens

- Sign in / create account
- Quick log entry
- Timeline and history filters
- Peptide management
- Settings and disclaimer

## Tech stack

- React Native
- Expo
- TypeScript
- Expo Router
- Firebase Auth
- Firestore
- Zustand
- Zod

## Folder structure

```text
.
├── .github/workflows/deploy.yml
├── assets/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (app)/
│   │   ├── +not-found.tsx
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── models/
│   ├── services/
│   ├── stores/
│   └── utils/
├── .env.example
├── .gitignore
├── app.config.ts
├── babel.config.js
├── firebase.json
├── firestore.rules
├── package.json
└── tsconfig.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example` and add your Firebase Web App credentials.

3. Enable Email/Password authentication in Firebase Auth.

4. Create a Firestore database and deploy the included rules:

```bash
firebase deploy --only firestore:rules
```

## Firebase env vars

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

## Firestore collections

- `users/{userId}/peptides/{peptideId}`
- `users/{userId}/logs/{logId}`

## Run locally

```bash
npm install
npx expo start
```

For web:

```bash
npx expo start --web
```

## Build for web

```bash
npx expo export:web
npx expo export --platform web
```

Expo static export outputs the production site to `dist/`.

## Deploy to GitHub Pages

PeptiLog is configured for GitHub Pages static hosting with Expo Web.

1. Keep the repository name as `PeptiLog`.
2. In GitHub, open `Settings > Pages`.
3. Set the source to `GitHub Actions`.
4. Add these repository secrets:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

5. Push to `main`. The workflow in `.github/workflows/deploy.yml` exports the Expo web app and deploys the `dist/` output to Pages.

The app config uses Expo static export and `experiments.baseUrl: "/PeptiLog"` so assets and routes resolve correctly from `https://<username>.github.io/PeptiLog/`.

## Git commands

If the remote already exists:

```bash
git add .
git commit -m "Initial MVP build: PeptiLog"
git push origin main
```

If you need to connect the remote first:

```bash
git remote add origin https://github.com/<username>/PeptiLog.git
git branch -M main
git add .
git commit -m "Initial MVP build: PeptiLog"
git push -u origin main
```
