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
  const [error, setError] = useState();

  // Load all messages from the redux store
  const availableMessages = useSelector((state) => state.messages.messages);

  const dispatch = useDispatch();

  // Create new user
  // Everytime you restart the app
  const loadUser = useCallback(async () => {
    try {
      await dispatch(userActions.newUser());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setError]);

  // Load all messages for the first time
  const loadMessagesFirst = useCallback(async () => {
    try {
      await dispatch(messageActions.fetchMessagesFirst());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setError]);

  // Load all messages
  const loadMessages = useCallback(async () => {
    setError(null);
    setRefresh(true);
    try {
      await dispatch(messageActions.fetchMessages(availableMessages));
    } catch (err) {
      setError(err.message);
    }
    setRefresh(false);
  }, [dispatch, setError]);

  useEffect(() => {
    setRefresh(true);
    loadUser();
    loadMessagesFirst();
    setRefresh(false);
  }, [dispatch, loadUser, loadMessagesFirst]);

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
      <FlatList
        data={availableMessages}
        renderItem={(itemData) => (
          <MessageCard
            navData={props.navigation}
            message={itemData.item}
            dispatch={dispatch}
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
            <Text>No messages have been published yet.</Text>
          </View>
        }
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

export default HomeScreen;
