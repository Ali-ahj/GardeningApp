import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import Modal from "react-native-modal";
import { getAuth } from "firebase/auth";

import Seperator from "./Seperator";
import colors from "../config/colors";

export default function UserInfoModal({ isvisible, onDismiss }) {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <Modal
      isVisible={isvisible}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
    >
      <View
        style={{
          flex: 0.3,
          backgroundColor: colors.white,
          borderRadius: 40,
          padding: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/user.png")}
            style={{ height: 80, width: 80, alignSelf: "center" }}
          />

          <Text style={styles.username}>{user.displayName}</Text>

          <View style={styles.row}>
            <MaterialIcons
              name="email"
              size={24}
              color={colors.primary}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 18 }}>{user.email}</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.row}>
            <FontAwesome
              name="phone"
              size={24}
              color={colors.primary}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 18 }}>{user.photoURL}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  line: {
    width: "65%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 20,
    alignSelf: "center",
  },
});
