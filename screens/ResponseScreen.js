import React, { useState, useCallback } from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import MessageCard from "../components/MessageCard";
import COLORS from "../constants/colors";
import Config from "../components/Config";
import * as messageActions from "../store/actions/messages";

const ResponseScreen = (props) => {
  const [refresh, setRefresh] = useState(false);

  const user = useSelector((state) => state.user.user);

  const availableMessages = useSelector((state) =>
    state.messages.messages.filter((message) =>
      message.reactions.some((reaction) => reaction.userId === user.id)
    )
  );

  const dispatch = useDispatch();

  // Load all messages
  const loadMessages = useCallback(async () => {
    setRefresh(true);
    try {
      await dispatch(messageActions.fetchMessages(availableMessages));
    } catch (err) {
      console.log(err);
    }
    setRefresh(false);
  }, [dispatch]);

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
            <Text>You have not responded to a message yet.</Text>
          </View>
        }
        // contentContainerStyle={styles.listContainer}
        refreshing={refresh}
        onRefresh={loadMessages}
      />
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

export default ResponseScreen;
