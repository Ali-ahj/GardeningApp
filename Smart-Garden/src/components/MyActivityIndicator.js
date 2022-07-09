import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

function MyActivityIndicator({ color, text }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} />
      <Text style={{ color, marginTop: 10, opacity: 0.7 }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyActivityIndicator;
