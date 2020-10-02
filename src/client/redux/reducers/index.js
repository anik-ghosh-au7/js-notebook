import { combineReducers } from "redux";

// reducers
import signReducer from "./sign.reducer";
import notificationReducer from "./notification.reducer";
import userReducer from "./user.reducer";
import notebooksReducer from "./notebooks.reducer";
import tabReducer from "./tabbar.reducer";
import activeTabReducer from "./activetab.reducer";
import setTabValueReducer from "./setTabValue.reducer";

export default combineReducers({
  signData: signReducer,
  notification: notificationReducer,
  userData: userReducer,
  notebooks: notebooksReducer,
  tab: tabReducer,
  activeTab: activeTabReducer,
  tabValue: setTabValueReducer,
});
