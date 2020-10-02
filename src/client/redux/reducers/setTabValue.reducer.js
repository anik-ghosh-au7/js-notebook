import { SET_VALUE } from "../actions/setTabValue.action";

let initValue = 0;

const reducer = (state = initValue, action) => {
  if (action.type === SET_VALUE) {
    return action.payload;
  }
  return state;
};

export default reducer;
