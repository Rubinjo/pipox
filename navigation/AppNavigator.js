import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import UserScreen from "../screens/SearchScreen";
import MessageScreen from "../screens/MessageScreen";
import COLORS from "../constants/colors";

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: COLORS.Foreground,
  },
  headerTintColor: COLORS.PrimaryColorOn,
};

const defaultTabOptions = {
  activeBackgroundColor: COLORS.Foreground,
  inactiveBackgroundColor: COLORS.Foreground,
  activeTintColor: COLORS.PrimaryColorOn,
  inactiveTintColor: COLORS.PrimaryColorOff,
};

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const UserStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStackNav = (props) => {
  return (
    <HomeStack.Navigator screenOptions={defaultStackOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Message" component={MessageScreen} />
    </HomeStack.Navigator>
  );
};

const SearchStackNav = (props) => {
  return (
    <SearchStack.Navigator screenOptions={defaultStackOptions}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="Message" component={MessageScreen} />
    </SearchStack.Navigator>
  );
};

const UserStackNav = (props) => {
  return (
    <UserStack.Navigator screenOptions={defaultStackOptions}>
      <UserStack.Screen name="User" component={UserScreen} />
      <UserStack.Screen name="Message" component={MessageScreen} />
    </UserStack.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={defaultTabOptions}>
        <Tab.Screen name="Home1" component={HomeStackNav} />
        <Tab.Screen name="Search1" component={SearchStackNav} />
        <Tab.Screen name="User1" component={UserStackNav} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
