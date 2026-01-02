import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform, Alert } from "react-native";
import { WebView } from "react-native-webview";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if (status !== "granted") {
          const { status: newStatus } =
            await Notifications.requestPermissionsAsync();
          finalStatus = newStatus;
        }

        if (finalStatus !== "granted") {
          Alert.alert(
            "Permission required",
            "Please enable notifications permission!"
          );
        } else {
          console.log("Notification permission granted!");
        }
      } catch (error) {
        console.log("Error requesting permissions:", error);
      }
    })();
  }, []);

  // IP address for Android Emulator to access host's localhost (10.0.2.2)
  // For iOS Simulator or Web, 'http://localhost' works.
  // Replace with your machine's LAN IP for real devices.
  const uri =
    Platform.OS === "android"
      ? "http://10.0.2.2:5173"
      : "http://localhost:5173";

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        source={{ uri }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
});
