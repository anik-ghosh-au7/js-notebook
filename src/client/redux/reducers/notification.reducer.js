import {
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from "../actions/notification.action";

// init state
const initialState = {
  open: false,
  msg: "",
  severity: "success",
};

// reducer logic
const reducer = (state = initialState, action) => {
  if (action.type === SET_NOTIFICATION) {
    return { ...state, ...action.payload };
  }
  if (action.type === CLEAR_NOTIFICATION) {
    return { ...state, open: false };
  }
  return state;
};

export default reducer;
