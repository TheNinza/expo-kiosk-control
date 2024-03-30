# expo-kiosk-control

A native expo module to control the kiosk mode on Android.

## Installation

```sh
npm install expo-kiosk-control
```

## Methods

### `startKioskMode()`

Starts the kiosk mode.

### `exitKioskMode()`

Exits the kiosk mode.

### `enableExitByUnpinning()`

Enables exiting kiosk mode by unpinning the app.

### `disableExitByUnpinning()`

Disables exiting kiosk mode by unpinning the app.

### `checkIfKioskEnabled()`

Returns a boolean indicating if the kiosk mode is enabled.

### `onRecentButtonPressed()`

Called when the recent button is pressed. This is used to prevent the app from being closed when the recent button is pressed and if `disableExitByUnpinning` has been called before.

> Must be called in the `AppState` change listener.

## Usage

See the [example](example/App.tsx) for a full example.
