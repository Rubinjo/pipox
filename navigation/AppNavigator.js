import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import MessageScreen from "../screens/MessageScreen";

const HomeStack = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Message" component={MessageScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
