import { signin, signup, forget } from "../actions/sign.action";

let initialState = {
  signup: false,
  signin: false,
  forget: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === signup) {
    return { ...state, signup: !state.signup };
  }

  if (action.type === signin) {
    return { ...state, signin: !state.signin };
  }

  if (action.type === forget) {
    return { ...state, forget: !state.forget };
  }

  return state;
};

export default reducer;
