import React, { useState } from "react";
import { LogBox } from "react-native";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as secureStore from "expo-secure-store";
import { DefaultTheme as NativeTheme } from "@react-navigation/native";

import AppStack from "./src/navigations/AppStack";
import AuthStack from "./src/navigations/AuthStack";
import { StateProvider } from "./src/hooks/useStates";
import colors from "./src/config/colors";

// initialize the firebase.
initializeApp({
  apiKey: "AIzaSyD1GYWEFb2Ackoap9LI5fesZAJIyYqHqo0",
  authDomain: "smart-garden-67558.firebaseapp.com",
  projectId: "smart-garden-67558",
  storageBucket: "smart-garden-67558.appspot.com",
  messagingSenderId: "73981774938",
  appId: "1:73981774938:web:a83bb2a81e9f8f640a1c63",
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isUserModal, setIsUserModal] = useState(false);
  const auth = getAuth();

  // state for the whole to use, using context API
  const states = {
    isLogged,
    setIsLogged,
    isUserModal,
    setIsUserModal,
  };

  LogBox.ignoreLogs([
    "AsyncStorage has been extracted",
    "Can't perform a React state update",
  ]);

  // this function will read the email and password of user form secure store
  // and then use those credentials to login the user automatically.
  const silentLogin = async () => {
    secureStore.getItemAsync("authUser").then((result) => {
      if (!result) return setIsReady(true);

      const { email, password } = JSON.parse(result);

      signInWithEmailAndPassword(auth, email, password)
        .then(() => setIsLogged(true))
        .catch(() => secureStore.deleteItemAsync("authUser"))
        .finally(() => setIsReady(true));
    });
  };

  return !isReady ? (
    <AppLoading
      startAsync={silentLogin}
      onFinish={() => null}
      onError={() => null}
    />
  ) : (
    <PaperProvider
      theme={{
        ...DefaultTheme,
        roundness: 10,
        colors: {
          ...DefaultTheme.colors,
          primary: colors.primary,
          placeholder: colors.placeholder,
          text: colors.white,
          background: colors.background,
        },
      }}
    >
      <StateProvider states={states}>
        <NavigationContainer
          theme={{
            ...NativeTheme,
            colors: {
              ...NativeTheme.colors,
              primary: colors.primary,
              background: colors.white,
            },
          }}
        >
          {isLogged ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </StateProvider>
    </PaperProvider>
  );
}
