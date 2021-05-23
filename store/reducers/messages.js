import { MESSAGES } from "../../constants/dummy-data";
import {
  ADD_MESSAGE,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  SET_MESSAGE,
  ADD_REACTION,
} from "../actions/messages";
import Message from "../../models/message";

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
      // NOT IMPLEMENTED
      const messageIndexReaction = state.messages.findIndex(
        (message) => message.id === action.pid
      );
      const updatedMessage = new Message(action.pid);
      return null;
    case UPDATE_LIKES:
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
        state.messages[messageIndexLike].reactions
      );
      const updatedMessagesLike = [...state.messages];
      updatedMessagesLike[messageIndexLike] = updatedMessageLike;
      return { messages: updatedMessagesLike };
    case UPDATE_DISLIKES:
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
        state.messages[messageIndexDislike].reactions
      );
      const updatedMessagesDislike = [...state.messages];
      updatedMessagesDislike[messageIndexDislike] = updatedMessageDislike;
      return { messages: updatedMessagesDislike };
    default:
      return state;
  }
};

export default messagesReducer;
