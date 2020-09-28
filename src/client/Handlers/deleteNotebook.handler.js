// store
import store from "../redux/store";
import { DELETE_NOTEBOOK } from "../redux/actions/notebooks.action";

// reducer method for delete notebook
export default () => {
  const id = store.getState().activeTab;
  return store.dispatch({
    type: DELETE_NOTEBOOK,
    payload: { id },
  });
};
