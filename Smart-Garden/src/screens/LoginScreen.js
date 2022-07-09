import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as secureStore from "expo-secure-store";

import colors from "../config/colors";
import { useStates } from "../hooks/useStates";

function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const { setIsLogged } = useStates();

  // this function will login the user in the app using firebase authentication service
  const handleLogin = () => {
    if ((!email, !password)) return;
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        secureStore.setItemAsync(
          "authUser",
          JSON.stringify({ email, password })
        );
        setIsLogged(true);
      })
      .catch(() => {
        Alert.alert("Login Failed!", "Given email or password is incorrect.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputs}>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(password) => setEmail(password)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Enter your Password"
          secureTextEntry
          style={{ marginTop: 10 }}
        />
      </View>

      <Button
        mode="contained"
        loading={loading}
        onPress={handleLogin}
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        log in
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.background,
  },
  button: {
    width: "85%",
    alignSelf: "center",
    marginTop: 30,
  },
  inputs: {
    marginTop: 30,
  },
});

export default LoginScreen;
