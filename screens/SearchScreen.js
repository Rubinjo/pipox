import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";
import Config from "../components/Config";

const SearchScreen = (props) => {
  const [searchTerm, setSearchTerm] = useState();

  const search = () => {
    console.log(searchTerm);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <Entypo name="magnifying-glass" size={22} color={COLORS.Foreground} />
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          keyboardAppearance="dark"
          placeholder="Search"
          placeholderTextColor={COLORS.Foreground}
          returnKeyType="search"
          onSubmitEditing={() => {
            search();
          }}
        />
      </View>
    </View>
  );
};

export const tabOptions = (navData) => {
  return {
    tabBarIcon: (props) => (
      <Entypo name="magnifying-glass" size={props.size} color={props.color} />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.Background,
  },
  searchBar: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: Config.deviceWidth * 0.03,
    paddingVertical: Config.deviceHeight * 0.003,
    marginVertical: Config.deviceHeight * 0.01,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    marginLeft: Config.deviceWidth * 0.01,
    width: "92%",
  },
});

export default SearchScreen;
