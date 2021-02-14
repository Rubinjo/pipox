import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MessageCard from "../components/MessageCard";
import ReactionCard from "../components/ReactionCard";
import COLORS from "../constants/colors";
import Config from "../components/Config";

const MessageScreen = (props) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(true);
  };

  const message = useSelector((state) => state.messages.messages[0]);
  return (
    <View style={styles.screen}>
      <MessageCard message={message} />
      <View
        style={{
          width: "100%",
          borderBottomWidth: 2,
        }}
      />
      <FlatList
        data={message.reactions}
        renderItem={(itemData) => <ReactionCard reaction={itemData.item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>KLOPT NIET</Text>}
        // contentContainerStyle={styles.listContainer}
        refreshing={refresh}
        onRefresh={() => this.handleRefresh()} // Not yet working
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.Background,
    paddingTop: Config.deviceHeight * 0.003,
  },
});

export default MessageScreen;
