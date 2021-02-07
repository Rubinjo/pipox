// Main Supporting technologies:
// Redux for temp on-device storage
// Redux-thunk for cloud message storage
// React Navigation V5 for screen navigation (stack + tab)

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import AppNavigator from "./navigation/AppNavigator";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import messagesReducer from "./store/reducers/messages";

// Return default font-family
const fetchFonts = async () => {
  return Font.loadAsync({});
};

const rootReducer = combineReducers({
  messages: messagesReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
