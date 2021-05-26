import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";
import Config from "./Config";
import * as messageActions from "../store/actions/messages";

class ReactionCard extends Component {
  constructor(props) {
    super(props);
  }

  likeReaction = async () => {
    // Check if reaction is not already liked
    if (!this.props.reaction.likeActivated) {
      // Check if reaction is already disliked
      if (this.props.reaction.dislikeActivated) {
        await this.dislikeReaction();
      }
      // Add like
      await this.props.dispatch(
        messageActions.updateLikesReaction(
          this.props.messageId,
          this.props.reaction.id,
          this.props.reaction.likes,
          true
        )
      );
    } else {
      // Delete like
      await this.props.dispatch(
        messageActions.updateLikesReaction(
          this.props.messageId,
          this.props.reaction.id,
          this.props.reaction.likes,
          false
        )
      );
    }
  };

  dislikeReaction = async () => {
    // Check if reaction is not already disliked
    if (!this.props.reaction.dislikeActivated) {
      // Check if reaction is already liked
      if (this.props.reaction.likeActivated) {
        await this.likeReaction();
      }
      // Add dislike
      await this.props.dispatch(
        messageActions.updateDislikesReaction(
          this.props.messageId,
          this.props.reaction.id,
          this.props.reaction.dislikes,
          true
        )
      );
    } else {
      // Delete dislike
      await this.props.dispatch(
        messageActions.updateDislikesReaction(
          this.props.messageId,
          this.props.reaction.id,
          this.props.reaction.dislikes,
          false
        )
      );
    }
  };

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.messageText}>{this.props.reaction.text}</Text>
        <View style={styles.infoSection}>
          <TouchableOpacity
            onPress={this.likeReaction}
            style={styles.infoSection}
          >
            <Text style={styles.infoText}>
              {this.props.reaction.likes + " "}
            </Text>
            <Entypo
              name="thumbs-up"
              size={17}
              color={
                this.props.reaction.likeActivated ? COLORS.green : COLORS.grey
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.dislikeReaction}
            style={styles.infoSection}
          >
            <Text style={styles.infoText}>
              {this.props.reaction.dislikes + " "}
            </Text>
            <Entypo
              name="thumbs-down"
              size={17}
              color={
                this.props.reaction.dislikeActivated
                  ? COLORS.PrimaryColorOn
                  : COLORS.grey
              }
            />
          </TouchableOpacity>
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
