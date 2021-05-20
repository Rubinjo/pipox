import { MESSAGES } from "../../constants/dummy-data";
import { ADD_MESSAGE, UPDATE_MESSAGE, SET_MESSAGE } from "../actions/messages";
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
    case UPDATE_MESSAGE:
      // NOT IMPLEMENTED
      return null;
    default:
      return state;
  }
};

export default messagesReducer;
