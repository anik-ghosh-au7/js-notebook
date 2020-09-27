import { SET_TAB } from "../actions/activetab.action";

let id = "";

const reducer = (state = id, action) => {
  if (action.type === SET_TAB) {
    return action.payload;
  }
  return state;
};

export default reducer;
