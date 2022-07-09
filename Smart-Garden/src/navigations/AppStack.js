import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  AntDesign,
  Octicons,
  SimpleLineIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "react-native-paper";
import * as secureStore from "expo-secure-store";

import HomeScreen from "../screens/HomeScreen";
import WeatherScreen from "../screens/WeatherScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import WebsiteScreen from "../screens/WebsiteScreen";
import DailyInputScreen from "../screens/DailyInputScreen";
import { useStates } from "../hooks/useStates";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

const FindStack = () => {
  const { isUserModal, setIsUserModal, setIsLogged } = useStates();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      secureStore.deleteItemAsync("authUser");
      setIsLogged(false);
    });
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
        tabBarActiveBackgroundColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarInactiveTintColor: "darkgrey",
        tabBarHideOnKeyboard: "true",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => setIsUserModal(!isUserModal)}
            >
              <FontAwesome5 name="user-alt" size={22} color={colors.white} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleLogout}>
              <SimpleLineIcons name="logout" size={20} color={colors.white} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="weather-hail"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="DailyInput"
        component={DailyInputScreen}
        options={{
          title: "Daily Input",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="checklist" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Website"
        component={WebsiteScreen}
        options={{
          title: "Search Plant",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="web" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default FindStack;
