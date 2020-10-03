import httpRequest from "../config/axios.config";
import store from "../redux/store";

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

    console.log("response ===> ", res.data);
  } catch (err) {
    console.log("error===>", err.response);
  }
};
