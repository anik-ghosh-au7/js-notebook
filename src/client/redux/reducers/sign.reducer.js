import {
  signin,
  signup,
  forget,
  signout,
  profile,
} from "../actions/sign.action";

let initialState = {
  signup: false,
  signin: false,
  forget: false,
  signout: false,
  profile: false,
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

  if (action.type === profile) {
    return { ...state, profile: !state.profile };
  }

  return state;
};

export default reducer;
