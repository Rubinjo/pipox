import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";
import Config from "./Config";

class ReactionCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.messageText}>{this.props.reaction.text}</Text>
        <View style={styles.infoSection}>
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              {this.props.reaction.likes + " "}
            </Text>
            <Entypo name="thumbs-up" size={17} color={COLORS.grey} />
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              {this.props.reaction.dislikes + " "}
            </Text>
            <Entypo name="thumbs-down" size={17} color={COLORS.grey} />
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              {this.props.reaction.time + " " + this.props.reaction.date}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: Config.deviceWidth * 0.03,
    width: "100%",
    backgroundColor: COLORS.Foreground,
    borderBottomWidth: 1.5,
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

export default ReactionCard;
