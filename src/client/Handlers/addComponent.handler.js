// store
import store from "../redux/store";
import { ADD_COMPONENT } from "../redux/actions/notebooks.action";

// reducer method for adding component
export default (component) => {
  const id = store.getState().activeTab;
  const notebooks = store.getState().notebooks;
  const notebookIdx = notebooks.findIndex((notebook) => notebook.id === id);
  if (notebookIdx !== -1) {
    if (!notebooks[notebookIdx].isSearched) {
      return store.dispatch({
        type: ADD_COMPONENT,
        payload: { id, component },
      });
    }
  }
  return null;
};
