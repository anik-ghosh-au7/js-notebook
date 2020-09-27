import { ADD_NOTEBOOK, ADD_COMPONENT } from "../actions/notebooks.action";
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
  switch (action.type) {
    case ADD_NOTEBOOK:
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

    case ADD_COMPONENT:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          let newNotebook = {
            ...state[i],
            components: [...state[i].components, action.payload.component],
          };

          let newState = state.slice();
          newState[i] = newNotebook;
          return newState;
        }
      }
      return state;

    default:
      return state;
  }
};

export default reducer;
