import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen, {
  tabOptions as homeTabOptions,
} from "../screens/HomeScreen";

import SearchScreen, {
  tabOptions as searchTabOptions,
} from "../screens/SearchScreen";

import UserScreen, {
  tabOptions as userTabOptions,
} from "../screens/UserScreen";

import MessageScreen from "../screens/MessageScreen";
import COLORS from "../constants/colors";

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: COLORS.Foreground,
  },
  headerTintColor: COLORS.PrimaryColorOn,
  headerTitleStyle: { alignSelf: "center" },
};

const defaultTabOptions = {
  activeBackgroundColor: COLORS.Foreground,
  inactiveBackgroundColor: COLORS.Foreground,
  activeTintColor: COLORS.PrimaryColorOn,
  inactiveTintColor: COLORS.PrimaryColorOff,
  showLabel: false,
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
        <Tab.Screen
          name="Home"
          component={HomeStackNav}
          options={homeTabOptions}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackNav}
          options={searchTabOptions}
        />
        <Tab.Screen
          name="User"
          component={UserStackNav}
          options={userTabOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
