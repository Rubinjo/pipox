import { MESSAGES } from "../../constants/dummy-data";

const initialState = {
  messages: MESSAGES,
};

const messagesReducer = (state = initialState, action) => {
  return state;
};

export default messagesReducer;
