import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";
import Config from "./Config";
import * as messageActions from "../store/actions/messages";

class ReactionCard extends Component {
  constructor(props) {
    super(props);
    this.state = { likeColor: COLORS.grey, dislikeColor: COLORS.grey };
  }

  likeMessage = async () => {
    if (this.state.likeColor === COLORS.grey) {
      // Check if message is already disliked
      if (this.state.dislikeColor === COLORS.PrimaryColorOn) {
        await this.dislikeMessage();
      }
      this.setState({ likeColor: COLORS.green });
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
      this.setState({ likeColor: COLORS.grey });
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

  dislikeMessage = async () => {
    if (this.state.dislikeColor === COLORS.grey) {
      // Check if message is already liked
      if (this.state.likeColor === COLORS.green) {
        await this.likeMessage();
      }
      this.setState({ dislikeColor: COLORS.PrimaryColorOn });
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
      this.setState({ dislikeColor: COLORS.grey });
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
            onPress={this.likeMessage}
            style={styles.infoSection}
          >
            <Text style={styles.infoText}>
              {this.props.reaction.likes + " "}
            </Text>
            <Entypo name="thumbs-up" size={17} color={this.state.likeColor} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.dislikeMessage}
            style={styles.infoSection}
          >
            <Text style={styles.infoText}>
              {this.props.reaction.dislikes + " "}
            </Text>
            <Entypo
              name="thumbs-down"
              size={17}
              color={this.state.dislikeColor}
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
