import store from "../redux/store";
import { UPDATE_NOTEBOOK } from "../redux/actions/notebooks.action";

export default () => {
  const id = store.getState().activeTab;
  store.dispatch({
    type: UPDATE_NOTEBOOK,
    payload: { id, name: "runAll", value: true },
  });
};
