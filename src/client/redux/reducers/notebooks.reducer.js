import { ADD_NOTEBOOK } from "../actions/notebooks.action";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const demoData = {
  id: uuidv4(),
  title: "New Title",
  author: "Guest",
  createdOn: moment().format("Do MMM, YYYY"),
  time: moment().format("hh:mm a"),
  modifiedOn: "just now",
  components: [],
};

const initNotebooks = [demoData];

const reducer = (state = initNotebooks, action) => {
  if (action.type === ADD_NOTEBOOK) {
    return [
      ...state,
      {
        ...demoData,
        title: `${demoData.title} ${state.length}`,
        id: uuidv4(),
        createdOn: moment().format("Do MMMM, YYYY"),
        time: moment().format("hh:mm a"),
      },
    ];
  }
  return state;
};

export default reducer;
