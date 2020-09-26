import { ADD_NOTEBOOK } from "../actions/notebooks.action";

const demoData = {
  id: 1,
  title: "New Title",
  value: "New Value",
};

const initNotebooks = [demoData];

const reducer = (state = initNotebooks, action) => {
  if (action.type === ADD_NOTEBOOK) {
    return [...state, { ...demoData, id: demoData.id + state.length }];
  }
  return state;
};

export default reducer;
