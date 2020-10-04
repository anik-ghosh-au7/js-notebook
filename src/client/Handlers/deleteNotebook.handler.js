// store
import store from "../redux/store";
import httpRequest from "../config/axios.config";
import { DELETE_NOTEBOOK } from "../redux/actions/notebooks.action";
import { SET_VALUE } from "../redux/actions/setTabValue.action";
import { SET_NOTIFICATION } from "../redux/actions/notification.action";

const setValue = (idx) => {
  if (idx < 0) idx = 0;
  return store.dispatch({
    type: SET_VALUE,
    payload: idx,
  });
};

const deleteFromServer = async (id) => {
  try {
    let res = await httpRequest({
      method: "POST",
      url: "http://localhost:5000/api/protected/delete",
      data: { id },
    });
    store.dispatch({
      type: SET_NOTIFICATION,
      payload: {
        open: true,
        severity: "success",
        msg: res.data.msg,
      },
    });
  } catch (err) {
    store.dispatch({
      type: SET_NOTIFICATION,
      payload: {
        open: true,
        severity: "error",
        msg: !!err.response ? err.response.data.msg : "Sorry! server is down.",
      },
    });
  }
};

// reducer method for delete notebook
export default async () => {
  const id = store.getState().activeTab;
  const notebooks = store.getState().notebooks;

  let idx = notebooks.findIndex((notebook) => notebook.id === id);

  if (idx !== -1) {
    if (!notebooks[idx].isSearched) {
      if (idx === notebooks.length - 1) {
        setValue(notebooks.length - 2);
      }

      await deleteFromServer(id);

      return store.dispatch({
        type: DELETE_NOTEBOOK,
        payload: { id },
      });
    }
  }
  return null;
};
