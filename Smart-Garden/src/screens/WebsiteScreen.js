import { View, StyleSheet } from "react-native";
import React from "react";

import colors from "../config/colors";
import MyWebView from "../components/MyWebView";

export default function WebsiteScreen() {
  return (
    <View style={styles.container}>
      <MyWebView uri="https://www.rhs.org.uk/plants/search-form" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
