import React, { useState } from "react";
import { View, FlatList, TextInput, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";
import Config from "../components/Config";
import MessageCard from "../components/MessageCard";

const SearchScreen = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchMessages, setSearchMessages] = useState([]);

  const handleRefresh = () => {
    setRefresh(true);
  };

  const messages = useSelector((state) => state.messages.messages);

  const search = () => {
    setSearchMessages(
      messages.filter((message) => message.text.includes(searchTerm))
    );
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
      <FlatList
        data={searchMessages}
        renderItem={(itemData) => (
          <MessageCard navData={props.navigation} message={itemData.item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        // contentContainerStyle={styles.listContainer}
        refreshing={refresh}
        onRefresh={() => this.handleRefresh()} // Not yet working
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
