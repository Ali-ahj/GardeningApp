import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import colors from "../config/colors";
import WeatherAPIKey from "../utils/WeatherAPIKey";
import ListItem from "../components/ListItem";

export default function ScheduleScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect will get the weather of next 3 days from "openweathermap" API.
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${londonCoordinates.lat}&lon=${londonCoordinates.lng}&exclude=current,minutely,hourly,alerts&appid=${WeatherAPIKey}`
    )
      .then((res) => res.json())
      .then((res) => setData(res.daily.slice(1, 4)))
      .catch(() => Alert.alert("Error!", "Unexpected error occured..."))
      .finally(() => setLoading(false));
  }, []);

  // helper function to get next 3 dates, according to days of month
  const getDate = (index) => {
    let dateString = "";

    const date = new Date();
    let result = date.setDate(date.getDate() + index);
    let current = new Date(result);

    let currDay = days[current.getDay()];
    let currDate = current.getDate();
    let currMonth = months[current.getMonth()];

    dateString = currDay + ", " + currDate + " " + currMonth;
    return dateString;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
          Next 3 days
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="small"
          color={colors.white}
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => JSON.stringify(item)}
          renderItem={({ item, index }) => (
            <ListItem
              title={item.rain ? item.rain + " mm" : 0 + " mm"}
              description={getDate(index + 1)}
              image={
                item.rain
                  ? require("../assets/rain.png")
                  : require("../assets/no-water.png")
              }
              style={{
                borderBottomLeftRadius: index == data.length - 1 ? 10 : 0,
                borderBottomRightRadius: index == data.length - 1 ? 10 : 0,
              }}
            />
          )}
        />
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

const londonCoordinates = {
  lat: 51.507351,
  lng: -0.127758,
};
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
