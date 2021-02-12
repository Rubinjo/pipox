import React, { useState } from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import MessageCard from "../components/MessageCard";
import COLORS from "../constants/colors";
import Config from "../components/Config";

const HomeScreen = (props) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(true);
  };

  const test = (availableMessages) => {
    console.log(availableMessages);
  };
  const availableMessages = useSelector((state) => state.messages.messages);

  return (
    <View style={styles.screen}>
      <FlatList
        data={availableMessages}
        renderItem={(itemData) => <MessageCard message={itemData.item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>KLOPT NIET</Text>}
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
      <Entypo name="home" size={props.size} color={props.color} />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.Background,
    paddingTop: Config.deviceHeight * 0.003,
  },
  listContainer: {},
});

export default HomeScreen;
