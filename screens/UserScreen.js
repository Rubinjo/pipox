import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";

const UserScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity>
          <View style={{ borderWidth: 2, borderRadius: 8 }}>
            <Entypo name="chat" size={42} color={COLORS.PrimaryColorOff} />
            <Text>Respons</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ borderWidth: 2, borderRadius: 8 }}>
            <Entypo name="thumbs-up" size={42} color={COLORS.PrimaryColorOff} />
            <Text>Likes: 10</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ borderWidth: 2, borderRadius: 8 }}>
            <Entypo name="cycle" size={42} color={COLORS.PrimaryColorOff} />
            <Text>Reload</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const tabOptions = (navData) => {
  return {
    tabBarIcon: (props) => (
      <Entypo name="message" size={props.size} color={props.color} />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.Background,
  },
});

export default UserScreen;
