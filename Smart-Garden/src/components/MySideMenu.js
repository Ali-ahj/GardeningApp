import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { useUser } from "../hooks/useUser";
import Seperator from "./Seperator";
import colors from "../config/colors";
import font from "../config/font";

export default function MySideMenu() {
  const { user, isUser } = useUser();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="account-circle"
        size={72}
        color={colors.primary}
      />
      <Text
        style={{
          fontSize: font.extraBig,
          fontWeight: "bold",
          marginVertical: 5,
        }}
      >
        {user.username}
      </Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <MaterialIcons
          name="email"
          size={20}
          color="darkgrey"
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: font.big }}>{user.email}</Text>
      </View>

      {isUser && (
        <>
          <Seperator style={{ marginVertical: 5 }} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: font.medium, fontWeight: "bold" }}>
              Age:
            </Text>
            <Text style={{ fontSize: font.big }}>{user.age}</Text>
          </View>

          <Seperator style={{ marginVertical: 5 }} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: font.medium, fontWeight: "bold" }}>
              Phone Number:{" "}
            </Text>
            <Text style={{ fontSize: font.big }}>{user.phoneNum}</Text>
          </View>

          <Seperator style={{ marginVertical: 5 }} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: font.medium, fontWeight: "bold" }}>
              NHS Number:{" "}
            </Text>
            <Text style={{ fontSize: font.big }}>{user.nhsNum}</Text>
          </View>
        </>
      )}
      <Seperator style={{ marginVertical: 5 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: font.medium, fontWeight: "bold" }}>
          {"Emergency Number: "}
        </Text>
        <Text style={{ fontSize: font.extraBig, fontWeight: "bold" }}>999</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    paddingVertical: 20,
  },
});
