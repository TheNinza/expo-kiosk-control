import {
  startKioskMode,
  exitKioskMode,
  enableExitByUnpinning,
  disableExitByUnpinning,
  checkIfKioskEnabled,
  onRecentButtonPressed,
} from "expo-kiosk-control";
import { useEffect, useState } from "react";
import {
  AppState,
  AppStateStatus,
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  View,
  Switch,
} from "react-native";

export default function App() {
  const [isKioskEnabled, setIsKioskEnabled] = useState(false);
  const [shouldExitByUnpinning, setShouldExitByUnpinning] = useState(false);
  const [shouldKeepAskingToStartKiosk, setShouldKeepAskingToStartKiosk] =
    useState(false);

  useEffect(() => {
    if (Platform.OS !== "android") {
      alert("Kiosk mode is only supported on Android");
      return;
    }
    if (isKioskEnabled) {
      startKioskMode();
    } else {
      exitKioskMode();
    }
  }, [isKioskEnabled]);

  useEffect(() => {
    if (shouldExitByUnpinning) {
      enableExitByUnpinning();
    } else {
      disableExitByUnpinning();
    }
  }, [shouldExitByUnpinning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isKioskEnabled && shouldKeepAskingToStartKiosk) {
      interval = setInterval(() => {
        if (!checkIfKioskEnabled()) {
          startKioskMode();
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isKioskEnabled, shouldKeepAskingToStartKiosk]);

  // listners
  useEffect(() => {
    // back handler
    const onBackPress = () => {
      return isKioskEnabled;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    // app state
    const onPause = (nextAppState: AppStateStatus) => {
      if (nextAppState !== "active") {
        onRecentButtonPressed();
      }
    };
    const pauseHandler = AppState.addEventListener("change", onPause);

    return () => {
      backHandler.remove();
      pauseHandler.remove();
    };
  }, [isKioskEnabled]);

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>Kiosk Mode</Text>
        <Switch
          value={isKioskEnabled}
          onValueChange={(value) => setIsKioskEnabled(value)}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Exit by unpinning</Text>
        <Switch
          value={shouldExitByUnpinning}
          onValueChange={(value) => setShouldExitByUnpinning(value)}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text>Keep asking to start kiosk</Text>
        <Switch
          value={shouldKeepAskingToStartKiosk}
          onValueChange={(value) => setShouldKeepAskingToStartKiosk(value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
});
