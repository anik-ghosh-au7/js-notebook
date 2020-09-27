import { SHIFT, UNSHIFT } from "../actions/tabbar.action";
const initState = false;

const reducer = (state = initState, action) => {
  if (action.type === SHIFT) {
    return true;
  }
  if (action.type === UNSHIFT) {
    return false;
  }
  return state;
};

export default reducer;
