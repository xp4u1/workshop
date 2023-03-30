import { StatusBar } from "expo-status-bar";
import WebView from "react-native-webview";

import { webview } from "./network.json";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <WebView source={{ uri: webview.url }} />
    </>
  );
}
