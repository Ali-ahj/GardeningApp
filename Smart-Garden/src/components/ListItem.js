import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

import colors from "../config/colors";

const iconsize = 65;

export default function ListItem({
  image,
  title,
  style,
  onPress = null,
  description,
}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image
        source={image}
        style={{
          width: iconsize,
          height: iconsize,
          marginLeft: 10,
          marginRight: 15,
        }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, marginBottom: 10, color: "dodgerblue" }}>
          {description}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
      </View>

      {onPress ? (
        <Entypo name="chevron-right" size={24} color="grey" />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 0.12,
    backgroundColor: colors.white,
    marginTop: 2,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
