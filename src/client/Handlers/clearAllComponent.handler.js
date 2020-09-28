// store
import store from "../redux/store";
import { CLEAR_ALL_COMPONENTS } from "../redux/actions/notebooks.action";

// reducer method for clear all component
export default () => {
  const id = store.getState().activeTab;
  return store.dispatch({
    type: CLEAR_ALL_COMPONENTS,
    payload: { id },
  });
};
