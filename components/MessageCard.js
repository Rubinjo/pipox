import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";
import Config from "./Config";
import * as messageActions from "../store/actions/messages";

class MessageCard extends Component {
  constructor(props) {
    super(props);
  }

  openMessage = (navData) => {
    navData.navigate("Message", {
      messageId: this.props.message.id,
    });
  };

  likeMessage = async () => {
    // Check if message is not already liked
    if (!this.props.message.likeActivated) {
      // Check if message is already disliked
      if (this.props.message.dislikeActivated) {
        await this.dislikeMessage();
      }
      // Add like
      await this.props.dispatch(
        messageActions.updateLikesMessage(
          this.props.message.id,
          this.props.message.likes,
          true
        )
      );
    } else {
      // Delete like
      await this.props.dispatch(
        messageActions.updateLikesMessage(
          this.props.message.id,
          this.props.message.likes,
          false
        )
      );
    }
  };

  dislikeMessage = async () => {
    // Check if message is not already disliked
    if (!this.props.message.dislikeActivated) {
      // Check if message is already liked
      if (this.props.message.likeActivated) {
        await this.likeMessage();
      }
      // Add dislike
      await this.props.dispatch(
        messageActions.updateDislikesMessage(
          this.props.message.id,
          this.props.message.dislikes,
          true
        )
      );
    } else {
      // Delete dislike
      await this.props.dispatch(
        messageActions.updateDislikesMessage(
          this.props.message.id,
          this.props.message.dislikes,
          false
        )
      );
    }
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
                {this.props.message.reactions
                  ? this.props.message.reactions.length + " "
                  : "0 "}
              </Text>
              <Entypo name="chat" size={17} color={COLORS.grey} />
            </View>
            <TouchableOpacity
              onPress={this.likeMessage}
              style={styles.infoSection}
            >
              <Text style={styles.infoText}>
                {this.props.message.likes + " "}
              </Text>
              <Entypo
                name="thumbs-up"
                size={17}
                color={
                  this.props.message.likeActivated ? COLORS.green : COLORS.grey
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.dislikeMessage}
              style={styles.infoSection}
            >
              <Text style={styles.infoText}>
                {this.props.message.dislikes + " "}
              </Text>
              <Entypo
                name="thumbs-down"
                size={17}
                color={
                  this.props.message.dislikeActivated
                    ? COLORS.PrimaryColorOn
                    : COLORS.grey
                }
              />
            </TouchableOpacity>
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
