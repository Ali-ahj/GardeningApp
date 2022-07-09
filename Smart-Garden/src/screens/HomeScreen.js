import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { getAuth } from "firebase/auth";

import colors from "../config/colors";
import ListItem from "../components/ListItem";
import { useStates } from "../hooks/useStates";
import UserInfoModal from "../components/UserInfoModal";

function HomeScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const { isUserModal, setIsUserModal } = useStates();

  return (
    <View style={styles.container}>
      <UserInfoModal
        isvisible={isUserModal}
        onDismiss={() => setIsUserModal(false)}
      />

      <View style={styles.topContainer}>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
          {`Hi ${user.displayName}`}
        </Text>
      </View>

      <ListItem
        title="Weather"
        description="Today's forecast"
        image={require("../assets/cloudy.png")}
        onPress={() => navigation.navigate("Weather")}
      />

      <ListItem
        title="Schedule"
        description="Next 3 days"
        image={require("../assets/calendar.png")}
        onPress={() => navigation.navigate("Schedule")}
      />

      <ListItem
        title="Daily Input"
        description="Water tracker"
        image={require("../assets/note.png")}
        onPress={() => navigation.navigate("DailyInput")}
      />

      <ListItem
        title="Search Plants"
        description="www.rhs.org.uk"
        image={require("../assets/www.png")}
        onPress={() => navigation.navigate("Website")}
        style={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  topContainer: {
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default HomeScreen;
