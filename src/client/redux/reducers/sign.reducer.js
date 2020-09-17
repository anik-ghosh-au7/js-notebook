import { signin, signup } from "../actions/sign.action";

let initialState = {
  signup: false,
  signin: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === signup) {
    return { ...state, signup: !state.signup };
  }

  if (action.type === signin) {
    return { ...state, signin: !state.signin };
  }

  return state;
};

export default reducer;
