import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "react-native-paper";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import colors from "../config/colors";

export default function DailyInputScreen() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Yes");
  const [items, setItems] = useState([
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ]);
  const db = getFirestore();
  const auth = getAuth();

  // this function will add the daily user input on firebase firestore.
  const handleSend = () => {
    if (loading) return;
    setLoading(true);

    const date = new Date().toISOString().split("T")[0];
    const uid = auth.currentUser.uid;
    const key = uid + "_" + date;

    setDoc(doc(db, "dailyInputs", key), {
      status: value,
    })
      .then(() => Alert.alert("Saved!!", "Daily Input Saved Successfully."))
      .catch(() => Alert.alert("Error!!", "Unexpected error occured!!"))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.white,
          height: Dimensions.get("screen").height * 0.6,
          borderRadius: 10,
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={require("../assets/wateringplants1.png")}
          style={{
            height: 220,
            width: 220,
          }}
        />

        <View
          style={{
            width: "100%",
            marginTop: 50,
          }}
        >
          <View
            style={[
              styles.box,
              { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
            ]}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Did you water today?
            </Text>
          </View>

          <DropDownPicker
            style={{
              borderWidth: 0.6,
              borderRadius: 0,
            }}
            textStyle={{ fontSize: 16 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />

          {!open && (
            <View
              style={[
                styles.box,
                {
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  padding: 5,
                },
              ]}
            >
              <Button
                mode="text"
                loading={loading}
                onPress={handleSend}
                theme={{ colors: { primary: "dodgerblue" } }}
              >
                Send Input
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  box: {
    borderWidth: 0.5,
    borderColor: colors.background,
    padding: 10,
    alignItems: "center",
  },
});
