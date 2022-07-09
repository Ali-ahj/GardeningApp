import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { Button } from "react-native-paper";

import colors from "../config/colors";

const backgroundImage = require("../assets/welcome.png");

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={backgroundImage}
      >
        <View style={styles.buttons}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Login")}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            Already a user ?
          </Button>

          <Text style={styles.or}>OR</Text>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Register")}
            style={[styles.button, { borderWidth: 0.25, borderColor: "grey" }]}
          >
            create new account
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: Dimensions.get("screen").height * 0.15,
  },
  button: {
    width: "85%",
    justifyContent: "center",
    borderRadius: 10,
  },
  or: {
    marginVertical: 10,
    fontSize: 14,
    color: "grey",
  },
});
