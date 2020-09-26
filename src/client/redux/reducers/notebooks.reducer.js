import { ADD_NOTEBOOK } from "../actions/notebooks.action";
import { v4 as uuidv4 } from "uuid";

const demoData = {
  id: uuidv4(),
  title: "New Title",
  author: "Guest",
  components: [],
};

const initNotebooks = [demoData];

const reducer = (state = initNotebooks, action) => {
  if (action.type === ADD_NOTEBOOK) {
    return [
      ...state,
      { ...demoData, title: `${demoData.title} ${state.length}`, id: uuidv4() },
    ];
  }
  return state;
};

export default reducer;
