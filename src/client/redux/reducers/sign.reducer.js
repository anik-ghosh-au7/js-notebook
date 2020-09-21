import { signin, signup, forget, signout } from "../actions/sign.action";

let initialState = {
  signup: false,
  signin: false,
  forget: false,
  signout: false,
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

  if (action.type === signout) {
    return { ...state, signout: !state.signout };
  }

  return state;
};

export default reducer;
