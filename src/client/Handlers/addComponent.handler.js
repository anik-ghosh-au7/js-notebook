// store
import store from "../redux/store";
import { ADD_COMPONENT } from "../redux/actions/notebooks.action";

// reducer method for adding component
export default (component) => {
  const id = store.getState().activeTab;
  return store.dispatch({
    type: ADD_COMPONENT,
    payload: { id, component },
  });
};
