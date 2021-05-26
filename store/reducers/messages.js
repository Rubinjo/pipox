import { MESSAGES } from "../../constants/dummy-data";
import {
  ADD_MESSAGE,
  UPDATE_LIKES_MESSAGE,
  UPDATE_DISLIKES_MESSAGE,
  UPDATE_LIKES_REACTION,
  UPDATE_DISLIKES_REACTION,
  SET_MESSAGE,
  ADD_REACTION,
} from "../actions/messages";
import Message from "../../models/message";
import Reaction from "../../models/reaction";

const initialState = {
  messages: MESSAGES,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { messages: action.messages };
    case ADD_MESSAGE:
      const newMessage = new Message(
        action.message.id,
        action.message.userId,
        action.message.text,
        action.message.date,
        action.message.likes,
        action.message.dislikes,
        action.message.reactions
      );
      return { messages: state.messages.concat(newMessage) };
    case ADD_REACTION:
      const messageIndexReaction = state.messages.findIndex(
        (message) => message.id === action.reaction.messageId
      );
      const updatedMessageReaction = new Message(
        action.reaction.messageId,
        state.messages[messageIndexReaction].userId,
        state.messages[messageIndexReaction].text,
        state.messages[messageIndexReaction].time,
        state.messages[messageIndexReaction].date,
        state.messages[messageIndexReaction].likes,
        state.messages[messageIndexReaction].dislikes,
        state.messages[messageIndexReaction].reactions.concat(
          new Reaction(
            action.reaction.id,
            action.reaction.userId,
            action.reaction.text,
            action.reaction.time,
            action.reaction.date,
            action.reaction.likes,
            action.reaction.dislikes
          )
        )
      );
      const updatedMessagesReaction = [...state.messages];
      updatedMessagesReaction[messageIndexReaction] = updatedMessageReaction;
      return { messages: updatedMessagesReaction };
    case UPDATE_LIKES_MESSAGE:
      const messageIndexLike = state.messages.findIndex(
        (message) => message.id === action.message.id
      );
      const updatedMessageLike = new Message(
        action.message.id,
        state.messages[messageIndexLike].userId,
        state.messages[messageIndexLike].text,
        state.messages[messageIndexLike].time,
        state.messages[messageIndexLike].date,
        action.message.likes,
        state.messages[messageIndexLike].dislikes,
        state.messages[messageIndexLike].reactions,
        action.message.likeActivated,
        state.messages[messageIndexLike].dislikeActivated
      );
      const updatedMessagesLike = [...state.messages];
      updatedMessagesLike[messageIndexLike] = updatedMessageLike;
      return { messages: updatedMessagesLike };
    case UPDATE_DISLIKES_MESSAGE:
      const messageIndexDislike = state.messages.findIndex(
        (message) => message.id === action.message.id
      );
      const updatedMessageDislike = new Message(
        action.message.id,
        state.messages[messageIndexDislike].userId,
        state.messages[messageIndexDislike].text,
        state.messages[messageIndexDislike].time,
        state.messages[messageIndexDislike].date,
        state.messages[messageIndexDislike].likes,
        action.message.dislikes,
        state.messages[messageIndexDislike].reactions,
        state.messages[messageIndexDislike].likeActivated,
        action.message.dislikeActivated
      );
      const updatedMessagesDislike = [...state.messages];
      updatedMessagesDislike[messageIndexDislike] = updatedMessageDislike;
      return { messages: updatedMessagesDislike };
    case UPDATE_LIKES_REACTION:
      const messageReactionIndexLike = state.messages.findIndex(
        (message) => message.id === action.reaction.messageId
      );
      const reactionIndexLike = state.messages[
        messageReactionIndexLike
      ].reactions.findIndex((reaction) => reaction.id === action.reaction.id);

      const updatedReactionLike = new Reaction(
        action.reaction.id,
        state.messages[messageReactionIndexLike].reactions[
          reactionIndexLike
        ].userId,
        state.messages[messageReactionIndexLike].reactions[
          reactionIndexLike
        ].text,
        state.messages[messageReactionIndexLike].reactions[
          reactionIndexLike
        ].time,
        state.messages[messageReactionIndexLike].reactions[
          reactionIndexLike
        ].date,
        action.reaction.likes,
        state.messages[messageReactionIndexLike].reactions[
          reactionIndexLike
        ].dislikes,
        action.reaction.likeActivated,
        state.messages[messageReactionIndexLike].reactions[
          reactionIndexLike
        ].dislikeActivated
      );
      const updatedMessagesAndReactionsLike = [...state.messages];
      updatedMessagesAndReactionsLike[messageReactionIndexLike].reactions[
        reactionIndexLike
      ] = updatedReactionLike;
      return { messages: updatedMessagesAndReactionsLike };
    case UPDATE_DISLIKES_REACTION:
      const messageReactionIndexDislike = state.messages.findIndex(
        (message) => message.id === action.reaction.messageId
      );
      const reactionIndexDislike = state.messages[
        messageReactionIndexDislike
      ].reactions.findIndex((reaction) => reaction.id === action.reaction.id);

      const updatedReactionDislike = new Reaction(
        action.reaction.id,
        state.messages[messageReactionIndexDislike].reactions[
          reactionIndexDislike
        ].userId,
        state.messages[messageReactionIndexDislike].reactions[
          reactionIndexDislike
        ].text,
        state.messages[messageReactionIndexDislike].reactions[
          reactionIndexDislike
        ].time,
        state.messages[messageReactionIndexDislike].reactions[
          reactionIndexDislike
        ].date,
        state.messages[messageReactionIndexDislike].reactions[
          reactionIndexDislike
        ].likes,
        action.reaction.dislikes,
        state.messages[messageReactionIndexDislike].reactions[
          reactionIndexDislike
        ].likeActivated,
        action.reaction.dislikeActivated
      );
      const updatedMessagesAndReactionsDislike = [...state.messages];
      updatedMessagesAndReactionsDislike[messageReactionIndexDislike].reactions[
        reactionIndexDislike
      ] = updatedReactionDislike;
      return { messages: updatedMessagesAndReactionsDislike };
    default:
      return state;
  }
};

export default messagesReducer;
