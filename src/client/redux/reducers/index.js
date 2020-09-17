import { combineReducers } from "redux";

// reducers
import signReducer from "./sign.reducer";

export default combineReducers({
  signData: signReducer,
});
