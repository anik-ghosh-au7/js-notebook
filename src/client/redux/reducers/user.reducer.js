import { SET_USER, CLEAR_USER } from "../actions/user.action";

// init state
const initUser = {};

// reducer
const reducer = (state = initUser, action) => {
  if (action.type === SET_USER) {
    return { ...state, ...action.payload };
  }
  if (action.type === CLEAR_USER) {
    return { ...initUser };
  }
  return state;
};

export default reducer;
