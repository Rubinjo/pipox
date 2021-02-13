import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";
import Config from "../components/Config";
import MessageCard from "../components/MessageCard";

const UserScreen = (props) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(true);
  };

  const availableMessages = useSelector((state) => state.messages.messages);
  return (
    <View style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: Config.deviceHeight * 0.02,
        }}
      >
        <Pressable
          onPress={() => {}}
          android_ripple={{
            color: COLORS.white,
            borderless: false,
            radius: 60,
          }}
          style={({ pressed }) => [
            {
              backgroundColor: COLORS.Foreground,
              borderRadius: 8,
              width: Config.deviceWidth * 0.22,
              height: Config.deviceHeight * 0.12,
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
            },
          ]}
        >
          <Entypo name="chat" size={48} color={COLORS.PrimaryColorOff} />
          <Text style={{ color: COLORS.grey }}>Respons</Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          android_ripple={{
            color: COLORS.white,
            borderless: false,
            radius: 60,
          }}
          style={({ pressed }) => [
            {
              backgroundColor: COLORS.Foreground,
              borderRadius: 8,
              width: Config.deviceWidth * 0.22,
              height: Config.deviceHeight * 0.12,
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
            },
          ]}
        >
          <Entypo name="thumbs-up" size={48} color={COLORS.PrimaryColorOff} />
          <Text style={{ color: COLORS.grey }}>Likes: 10</Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          android_ripple={{
            color: COLORS.white,
            borderless: false,
            radius: 60,
          }}
          style={({ pressed }) => [
            {
              backgroundColor: COLORS.Foreground,
              borderRadius: 8,
              width: Config.deviceWidth * 0.22,
              height: Config.deviceHeight * 0.12,
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
            },
          ]}
        >
          <Entypo name="cycle" size={48} color={COLORS.PrimaryColorOff} />
          <Text style={{ color: COLORS.grey }}>Reload</Text>
        </Pressable>
      </View>
      <FlatList
        data={availableMessages}
        ListHeaderComponent={() => (
          <View
            style={{
              alignItems: "center",
              borderTopWidth: 2,
              borderTopColor: COLORS.grey,
              marginTop: Config.deviceHeight * 0.015,
              paddingVertical: Config.deviceHeight * 0.005,
            }}
          >
            <Text style={{ color: COLORS.white }}>All your messages</Text>
            <Entypo name="chevron-down" size={16} color={COLORS.white} />
          </View>
        )}
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
