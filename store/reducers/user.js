import { NEW_USER } from "../actions/user";
import User from "../../models/user";

const initialState = {
  user: new User("u1", "default"),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_USER:
      const newUser = new User(action.user.id, action.user.role);
      return { user: newUser };
    default:
      return state;
  }
};

export default userReducer;
