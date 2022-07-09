import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import colors from "../config/colors";

const stack = createNativeStackNavigator();

const AuthStack = () => (
  <stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      tabBarActiveTintColor: colors.primary,
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerTitleAlign: "center",
    }}
  >
    <stack.Screen name="Welcome" component={WelcomeScreen} />
    <stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: "Login" }}
    />
    <stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ title: "Register" }}
    />
  </stack.Navigator>
);

export default AuthStack;
