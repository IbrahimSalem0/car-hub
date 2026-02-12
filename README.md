# Car Hub

A React Native (Expo) app to browse a list of cars, view details, and simulate checkout.

## Features

- Scrollable list of 25+ cars with name, brand, price, and image
- Pull to refresh and load more (pagination)
- Product details screen with multiple images, specs, and available colors
- Simulated checkout action
- Mock API with delayed responses

## Tech Stack

- **Expo** (SDK 54) with **Expo Router** for file-based navigation
- **React Native** · **TypeScript** · **Yarn**

## Project Structure

```
src/
├── components/     # Reusable UI (CarListItem, Button, Container, …)
├── constants/      # Mock data (cars)
├── network/        # API layer (fetchCarsPage, fetchCarById)
├── screens/        # Routes (home, details, layout, not-found)
│   ├── home/       # Car list
│   └── details/    # Car details + checkout
└── types/          # TypeScript types (Car)
```

## Getting Started

### Prerequisites

- Node.js
- Yarn
- iOS Simulator (Xcode) or Android emulator, or [Expo Go](https://expo.dev/go) on a device

### Install

```bash
yarn install
```

### Run

```bash
yarn start
```

Then press `i` for iOS, `a` for Android, or scan the QR code with Expo Go.

### Other scripts

| Command   | Description        |
|----------|--------------------|
| `yarn ios`     | Run on iOS         |
| `yarn android` | Run on Android     |
| `yarn web`     | Run in the browser |
| `yarn lint`    | Run ESLint         |
| `yarn format`  | Fix and format     |

## Routes

| Path     | Screen       |
|----------|--------------|
| `/`      | Redirects to `/home` |
| `/home`  | Car list     |
| `/details?id=<id>` | Car details + checkout |

## License

Private.
