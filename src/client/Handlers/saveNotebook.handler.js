import httpRequest from "../config/axios.config";
import store from "../redux/store";

// reducer action
import { SET_NOTIFICATION } from "../redux/actions/notification.action";

export default async () => {
  try {
    let notebookId = store.getState().activeTab;
    let notebooks = store.getState().notebooks;
    let index = notebooks.findIndex((notebook) => notebookId === notebook.id);
    let notebook = notebooks[index];
    let components = JSON.stringify(notebook.components);
    let newNotebook = { ...notebook, components };
    let res = await httpRequest({
      method: "POST",
      url: "http://localhost:5000/api/protected/add",
      data: newNotebook,
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
