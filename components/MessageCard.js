import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";
import Config from "./Config";

class MessageCard extends Component {
  constructor(props) {
    super(props);
  }

  openMessage = (navData) => {
    navData.navigate({ name: "Message" });
  };

  render() {
    return (
      <TouchableOpacity
        onPress={
          this.props.navData
            ? () => this.openMessage(this.props.navData)
            : void 0
        }
        activeOpacity={this.props.navData ? 0.7 : 1}
      >
        <View style={styles.card}>
          <Text style={styles.messageText}>{this.props.message.text}</Text>
          <View style={styles.infoSection}>
            <View style={styles.infoSection}>
              <Text style={styles.infoText}>
                {this.props.message.reactions.length + " "}
              </Text>
              <Entypo name="chat" size={17} color={COLORS.grey} />
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoText}>
                {this.props.message.likes + " "}
              </Text>
              <Entypo name="thumbs-up" size={17} color={COLORS.grey} />
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoText}>
                {this.props.message.dislikes + " "}
              </Text>
              <Entypo name="thumbs-down" size={17} color={COLORS.grey} />
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.infoText}>
                {this.props.message.time + " " + this.props.message.date}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginVertical: Config.deviceHeight * 0.005,
    padding: Config.deviceWidth * 0.02,
    width: Config.deviceWidth * 0.96,
    borderRadius: 8,
    backgroundColor: COLORS.Foreground,
    alignSelf: "center",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Config.deviceHeight * 0.007,
  },
  messageText: {
    fontFamily: "segoe-ui-regular",
    color: COLORS.white,
  },
  infoText: {
    fontFamily: "segoe-ui-regular",
    color: COLORS.grey,
  },
});

export default MessageCard;
