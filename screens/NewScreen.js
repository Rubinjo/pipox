import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import COLORS from "../constants/colors";
import Config from "../components/Config";

const NewScreen = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const search = () => {
    console.log(searchTerm);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          keyboardAppearance="dark"
          placeholder="Type here your message..."
          placeholderTextColor={COLORS.Foreground}
          multiline={true}
          returnKeyType="done"
        />
      </View>
      <View style={styles.counter}>
        <Text style={styles.counterText}>250/{searchTerm.length}</Text>
      </View>
      <TouchableOpacity>
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
