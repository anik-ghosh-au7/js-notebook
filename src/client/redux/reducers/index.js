import { combineReducers } from "redux";

// reducers
import signReducer from "./sign.reducer";
import notificationReducer from "./notification.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  signData: signReducer,
  notification: notificationReducer,
  userData: userReducer,
});
