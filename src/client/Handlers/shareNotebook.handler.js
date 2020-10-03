// store
import store from "../redux/store";

// reducer actions
import { share } from "../redux/actions/sign.action";

export default () => {
  if (store.getState().activeTab !== -1)
    store.dispatch({
      type: share,
    });
  else return;
};
