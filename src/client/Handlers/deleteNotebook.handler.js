// store
import store from "../redux/store";
import { DELETE_NOTEBOOK } from "../redux/actions/notebooks.action";
import { SET_VALUE } from "../redux/actions/setTabValue.action";

const setValue = (idx) => {
  if (idx < 0) idx = 0;
  return store.dispatch({
    type: SET_VALUE,
    payload: idx,
  });
};

// reducer method for delete notebook
export default () => {
  const id = store.getState().activeTab;
  const notebooks = store.getState().notebooks;

  let idx = notebooks.findIndex((notebook) => notebook.id === id);

  if (idx !== -1) {
    if (idx === notebooks.length - 1) {
      setValue(notebooks.length - 2);
    }
  }

  return store.dispatch({
    type: DELETE_NOTEBOOK,
    payload: { id },
  });
};
