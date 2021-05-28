import React, { useState } from "react";
import { View, FlatList, TextInput, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";
import Config from "../components/Config";
import MessageCard from "../components/MessageCard";

const SearchScreen = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  const dispatch = useDispatch();

  // Load messages from the redux store where the text includes the search term
  let messages = useSelector((state) =>
    state.messages.messages.filter((message) =>
      message.text.includes(searchTerm)
    )
  );

  // Search for messages that include a given search term
  // Causes reload of the messages variable
  const search = () => {
    setRefresh(true);
    if (searchInput) {
      setSearchTerm(searchInput);
    }
    setRefresh(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <Entypo name="magnifying-glass" size={22} color={COLORS.Foreground} />
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}
          keyboardAppearance="dark"
          placeholder="Search"
          placeholderTextColor={COLORS.Foreground}
          returnKeyType="search"
          onSubmitEditing={() => {
            search();
          }}
        />
      </View>
      <FlatList
        data={messages}
        renderItem={(itemData) => (
          <MessageCard
            navData={props.navigation}
            dispatch={dispatch}
            message={itemData.item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        // contentContainerStyle={styles.listContainer}
        refreshing={refresh}
        onRefresh={search}
      />
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
