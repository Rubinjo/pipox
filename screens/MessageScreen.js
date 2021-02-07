import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>MessageScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default MessageScreen;
