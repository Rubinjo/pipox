import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import MessageCard from "../components/MessageCard";
import ReactionCard from "../components/ReactionCard";
import COLORS from "../constants/colors";
import Config from "../components/Config";

const MessageScreen = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [postReaction, setPostReaction] = useState("");

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
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              marginTop: Config.deviceHeight * 0.02,
            }}
          >
            <Text>This post has no reactions yet.</Text>
          </View>
        }
        // contentContainerStyle={styles.listContainer}
        refreshing={refresh}
        onRefresh={() => this.handleRefresh()} // Not yet working
      />
      <View style={styles.counter}>
        <Text style={styles.counterText}>250/{postReaction.length}</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setPostReaction(text)}
          value={postReaction}
          keyboardAppearance="dark"
          placeholder="Add your reaction..."
          placeholderTextColor={COLORS.Foreground}
          multiline={true}
          returnKeyType="done"
        />
        <TouchableOpacity>
          <Entypo
            name="arrow-with-circle-right"
            size={22 + Config.deviceHeight * 0.006}
            color={COLORS.PrimaryColorOn}
          />
        </TouchableOpacity>
      </View>
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
  searchBar: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: Config.deviceHeight * 0.003,
    marginTop: Config.deviceHeight * 0.01,
    marginBottom: Config.deviceHeight * 0.02,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    maxHeight: Config.deviceHeight * 0.182,
  },
  searchInput: {
    marginLeft: Config.deviceWidth * 0.025,
    width: "89%",
  },
  counter: {
    alignItems: "flex-end",
    paddingRight: Config.deviceWidth * 0.06,
  },
  counterText: {
    color: COLORS.grey,
    fontFamily: "segoe-ui-regular",
  },
});

export default MessageScreen;
