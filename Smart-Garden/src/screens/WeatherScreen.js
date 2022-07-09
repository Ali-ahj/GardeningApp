import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

import ListItem from "../components/ListItem";
import colors from "../config/colors";
import weatherAPIkey from "../utils/WeatherAPIKey";

export default function WeatherScreen() {
  const [temperatue, setTemperatue] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rain, setRain] = useState("");
  const [loading, setLoading] = useState(true);

  const date = new Date().toISOString().split("T")[0];
  const time = new Date().toISOString().split(".")[0].split("T")[1];
  const londonCoordinates = {
    lat: 51.507351,
    lng: -0.127758,
  };

  // this useEffect will fetch the current weather.
  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${londonCoordinates.lat}&lon=${londonCoordinates.lng}&APPID=${weatherAPIkey}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        setTemperatue(res.main.temp);
        setHumidity(res.main.humidity);
        setRain(res.rain ? res.rain["3h"] : 0);

        if (res.rain) Alert.alert("Should water?", "No, it was raining..");
        else Alert.alert("Should water?", "Yes, there is no rain..");
      })
      .catch(() => Alert.alert("Error!", "Unexpected error occured..."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
          London
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size='small'
          color={colors.white}
          style={{ marginTop: 20 }}
        />
      ) : (
        <>
          <ListItem
            title={temperatue + " °"}
            description={`${date} ${time}`}
            image={require("../assets/hot.png")}
          />

          <ListItem
            title={rain + " mm"}
            description='Rain (since 3 hours)'
            image={require("../assets/rain.png")}
          />

          <ListItem
            title={humidity + "%"}
            description='Humidity'
            image={require("../assets/humidity.png")}
            style={{
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          />
        </>
      )}
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
