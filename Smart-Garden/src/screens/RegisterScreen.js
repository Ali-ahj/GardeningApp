import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import * as secureStore from "expo-secure-store";

import colors from "../config/colors";
import { useStates } from "../hooks/useStates";

function RegisterScreen({}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [loading, setLoading] = useState(false);
  const { setIsLogged } = useStates();

  const auth = getAuth();

  // this function will create new user account on firebase.
  const handleSubmit = () => {
    if (!email || !password || !username || !phoneNum) return;
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        secureStore.setItemAsync(
          "authUser",
          JSON.stringify({ email, password })
        );

        // phonoURL prop will be use as phone number
        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: phoneNum,
        });

        setIsLogged(true);
      })
      .catch((error) => Alert.alert("Registration Failed!", error.message))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={styles.textInput}
      />

      <TextInput
        mode="outlined"
        label="Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Enter your name"
        style={styles.textInput}
      />

      <TextInput
        mode="outlined"
        label="Phone Number"
        value={phoneNum}
        onChangeText={(text) => setPhoneNum(text)}
        placeholder="Enter your phone number"
        style={styles.textInput}
      />

      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your Password"
        secureTextEntry
        style={styles.textInput}
      />

      <Button
        mode="contained"
        loading={loading}
        onPress={handleSubmit}
        style={styles.button}
      >
        register
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  button: {
    width: "85%",
    alignSelf: "center",
    marginTop: 30,
  },
  textInput: {
    marginTop: 10,
  },
});

export default RegisterScreen;
