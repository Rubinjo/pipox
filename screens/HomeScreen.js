import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MessageCard from "../components/MessageCard";
import HeaderButton from "../components/HeaderButton";
import COLORS from "../constants/colors";
import Config from "../components/Config";
import * as userActions from "../store/actions/user";
import * as messageActions from "../store/actions/messages";

const HomeScreen = (props) => {
  const [refresh, setRefresh] = useState(false);

  const availableMessages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();

  // Create new user
  // Everytime you restart the app
  const loadUser = useCallback(async () => {
    try {
      await dispatch(userActions.newUser());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  // Load all messages
  const loadMessages = useCallback(async () => {
    setRefresh(true);
    try {
      await dispatch(messageActions.fetchMessages());
    } catch (err) {
      console.log(err);
    }
    setRefresh(false);
  }, [dispatch]);

  useEffect(() => {
    loadUser();
    loadMessages();
  }, [dispatch, loadUser, loadMessages]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={availableMessages}
        renderItem={(itemData) => (
          <MessageCard
            navData={props.navigation}
            message={itemData.item}
            dispatch={dispatch}
            loadMessages={loadMessages}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>KLOPT NIET</Text>}
        // contentContainerStyle={styles.listContainer}
        refreshing={refresh}
        onRefresh={loadMessages}
      />
    </View>
  );
};

export const stackOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="CreateMessage"
          iconName="new-message"
          onPress={() => {
            navData.navigation.navigate({ name: "New" });
          }}
        />
      </HeaderButtons>
    ),
  };
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
  centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
