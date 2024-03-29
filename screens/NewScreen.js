import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import COLORS from "../constants/colors";
import Config from "../components/Config";
import * as messageActions from "../store/actions/messages";

const NewScreen = (props) => {
  const [postMessage, setPostMessage] = useState("");

  // Load current user id from the redux store
  const userId = useSelector((state) => state.user.user.id);

  const dispatch = useDispatch();

  // Post a new message
  // Alters firebase & redux store
  const post = async () => {
    if (postMessage.length <= 250) {
      try {
        await dispatch(messageActions.addMessage(userId, postMessage));
        setPostMessage("");
      } catch {
        Alert.alert(
          "Error",
          "Something went wrong when posting the message, please try again.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      }
    } else {
      Alert.alert(
        "Message too long",
        "Your message exceeds the limit of 250 characters, please shorten your message.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setPostMessage(text)}
          value={postMessage}
          keyboardAppearance="dark"
          placeholder="Type here your message..."
          placeholderTextColor={COLORS.Foreground}
          multiline={true}
          returnKeyType="send"
        />
      </View>
      <View style={styles.counter}>
        <Text style={styles.counterText}>250/{postMessage.length}</Text>
      </View>
      <TouchableOpacity onPress={() => post()}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Post</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
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
    paddingVertical: Config.deviceHeight * 0.003,
    marginVertical: Config.deviceHeight * 0.01,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    maxHeight: Config.deviceHeight * 0.182,
  },
  searchInput: {
    marginLeft: Config.deviceWidth * 0.025,
    width: "95%",
  },
  counter: {
    alignItems: "flex-end",
    paddingRight: Config.deviceWidth * 0.06,
  },
  counterText: {
    color: COLORS.grey,
    fontFamily: "segoe-ui-regular",
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: COLORS.PrimaryColorOn,
    borderRadius: 12,
    paddingHorizontal: Config.deviceWidth * 0.08,
    paddingVertical: Config.deviceHeight * 0.007,
    marginTop: Config.deviceHeight * 0.02,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 42,
  },
});

export default NewScreen;
