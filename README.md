# Knaller Sound App

Reggae & Dancehall Soundboard — Expo-App (Web PWA + iOS/Android).

**Live:** [https://knallersound.netlify.app/](https://knallersound.netlify.app/)

## Features

- Soundboard mit 15 Sounds (Sirene, Airhorn, Dubplate, …)
- Videos, Events, Social Links
- Installierbare PWA (Add to Home Screen)

## Entwicklung

```bash
npm install
npm run web          # Dev-Server
npm run build:web    # statischer Export nach dist/
```

## Netlify

- **Build:** `npx expo export --platform web && node scripts/post-build.js` (siehe `netlify.toml`)
- **Publish directory:** `dist`
- **Git-Deploy:** Repo mit Netlify verbinden → Push auf `master` deployt Production
- **Manuell:** `dist/` nach Build per Netlify CLI oder Dashboard hochladen

Öffentliche URL in `knaller_netlify_url.txt` pflegen.

## Struktur

| Ordner | Inhalt |
|--------|--------|
| `app/` | Expo Router Screens (Home, Soundboard, Videos, …) |
| `assets/sounds/` | MP3-Sounds |
| `public/` | PWA-Manifest & Icons |
| `web/` | Service Worker, HTML-Shell |
| `scripts/` | Icon-/Sound-Generatoren, Post-Build |
