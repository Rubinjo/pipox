import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>SearchScreen</Text>
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

export default SearchScreen;
