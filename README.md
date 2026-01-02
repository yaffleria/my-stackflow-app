# Stackflow Hybrid App

A monorepo containing a web app (Stackflow) and a mobile app (Expo) that wraps the user interface.

## Structure

- `apps/web`: React + Vite + Stackflow
- `apps/mobile`: Expo + React Native Webview

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run Web App:

   ```bash
   cd apps/web
   pnpm dev
   ```

3. Run Mobile App:
   ```bash
   cd apps/mobile
   pnpm android # or ios
   ```
   _Note: Ensure the local IP in `apps/mobile/App.tsx` is correct for your development environment._

## Features

- **Stackflow**: Native-like navigation in the web app.
- **Hybrid**: Wrapped in a WebView.
- **Permissions**: Example notification permission request on app launch.
