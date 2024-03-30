import ExpoKioskControlModule from "./ExpoKioskControlModule";

export const startKioskMode = () => {
  ExpoKioskControlModule.startKioskMode();
};

export const exitKioskMode = () => {
  ExpoKioskControlModule.exitKioskMode();
};

export const onRecentButtonPressed = () => {
  ExpoKioskControlModule.onRecentButtonPressed();
};

export const enableExitByUnpinning = () => {
  ExpoKioskControlModule.enableExitByUnpinning();
};

export const disableExitByUnpinning = () => {
  ExpoKioskControlModule.disableExitByUnpinning();
};

export const checkIfKioskEnabled: () => boolean = () => {
  return ExpoKioskControlModule.checkIfKioskEnabled();
};
