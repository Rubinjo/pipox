import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import MessageCard from "../components/MessageCard";
import ReactionCard from "../components/ReactionCard";
import COLORS from "../constants/colors";
import Config from "../components/Config";
import * as messageActions from "../store/actions/messages";

const MessageScreen = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState();
  const [postReactionText, setPostReactionText] = useState("");

  // Load all messages from the redux store
  const messages = useSelector((state) => state.messages.messages);

  // Select message that corrosponds to the messageId provided
  const messageIndex = messages.findIndex(
    (message) => message.id === props.route.params.messageId
  );
  const message = messages[messageIndex];

  // Load current user details from the redux store
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // Load all messages
  const loadMessages = useCallback(async () => {
    setError(null);
    setRefresh(true);
    try {
      await dispatch(messageActions.fetchMessages(messages));
    } catch (err) {
      setError(err.message);
    }
    setRefresh(false);
  }, [dispatch, setError]);

  // Post a reaction on a message
  // Alters firebase & redux store
  const postReaction = async () => {
    if (postReactionText.length <= 250) {
      try {
        await dispatch(
          messageActions.addReaction(message.id, user.id, postReactionText)
        );
      } catch (err) {
        setError(err.message);
      }
      setPostReactionText("");
    } else {
      Alert.alert(
        "Reaction too long",
        "Your reaction exceeds the limit of 250 characters, please shorten your reaction.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text
          style={{
            color: COLORS.white,
            paddingBottom: Config.deviceHeight * 0.01,
          }}
        >
          An error occurred!
        </Text>
        <Button
          title="Try again"
          onPress={loadMessages}
          color={COLORS.PrimaryColorOn}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <MessageCard message={message} dispatch={dispatch} />
      <View
        style={{
          width: "100%",
          borderBottomWidth: 2,
        }}
      />
      <FlatList
        data={message.reactions}
        renderItem={(itemData) => (
          <ReactionCard
            reaction={itemData.item}
            dispatch={dispatch}
            messageId={message.id}
          />
        )}
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
        onRefresh={loadMessages}
      />
      <View style={styles.counter}>
        <Text style={styles.counterText}>250/{postReactionText.length}</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setPostReactionText(text)}
          value={postReactionText}
          keyboardAppearance="dark"
          placeholder="Add your reaction..."
          placeholderTextColor={COLORS.Foreground}
          multiline={true}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={() => postReaction()}>
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
  centered: {
    backgroundColor: COLORS.Background,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageScreen;
