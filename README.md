# Stackflow Hybrid App

A monorepo containing a web app (Stackflow) and a native app (Expo) that wraps the user interface.

## Structure

- `apps/web`: React + Vite + Stackflow (Your main logic and UI)
- `apps/native`: Expo + React Native Webview (The native shell)

## Getting Started (Local Development)

### 1. Prerequisites

- **Node.js** (LTS version recommended)
- **pnpm** (Package manager)
- **Expo Go App** (on your physical Android/iOS device) OR **Android Studio / Xcode** (for emulators/simulators)

### 2. Install Dependencies

Run this in the root directory:

```bash
pnpm install
```

### 3. Run the App

You need two terminal windows running simultaneously.

#### Terminal 1: Web App (The Content)

This serves your Stackflow web application.

```bash
# From root
pnpm web
```

- Checks if local server is running at `http://localhost:5173`

#### Terminal 2: Native App (The Shell)

This launches the native container that displays your web app.

```bash
# From root

# option A: Run on Android Emulator or Device
pnpm android

# option B: Run on iOS Simulator (Mac only)
pnpm ios

# option C: Start Metro Bundler (Generic)
pnpm native
```

> **Important Note for Android Emulator**:
> By default, the native app tries to connect to `http://10.0.2.2:5173`.
> This specific IP is a special alias in Android Emulators that points to your computer's `localhost`.
>
> If you are using a **Physical Device** or **iOS Simulator**, you might need to change the `uri` implementation in `apps/native/App.tsx` to use your computer's actual LAN IP address (e.g., `http://192.168.x.x:5173`).

## Project Commands (Root)

- `pnpm web`: Run web app dev server
- `pnpm native`: Start Expo Metro bundler
- `pnpm android`: Open in Android Emulator
- `pnpm ios`: Open in iOS Simulator
- `pnpm build`: Build all apps
- `pnpm test`: Run tests

## Features

- **Stackflow**: Native-like navigation logic managed in `apps/web`.
- **Hybrid Architecture**: `apps/web` provides the UI, `apps/native` provides the device capabilities.
- **Permissions**: Example notification permission request included in the native app entry point.
