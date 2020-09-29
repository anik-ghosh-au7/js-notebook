import {
  ADD_NOTEBOOK,
  ADD_COMPONENT,
  CHANGE_ARRANGEMENT,
  DELETE_COMPONENT,
  CLEAR_ALL_COMPONENTS,
  DELETE_NOTEBOOK,
  UPDATE_NOTEBOOK,
} from "../actions/notebooks.action";
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

// mutation of component
const arrayMoveMutate = (components, from, to) => {
  components.splice(
    to < 0 ? components.length + to : to,
    0,
    components.splice(from, 1)[0]
  );
};

// new components array
const arrayMove = (components, from, to) => {
  let newComponents = components.slice();
  arrayMoveMutate(newComponents, from, to);
  return newComponents;
};

// new component for delete handler
const newCompo = (components, idx) => {
  let newComponents = components.slice();
  newComponents.splice(idx, 1);
  return newComponents;
};

const reducer = (state = initNotebooks, action) => {
  let idx = -1;

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

    case DELETE_NOTEBOOK:
      idx = state.findIndex((notebook) => notebook.id === action.payload.id);
      if (idx !== -1) {
        let newState = state.slice();
        newState.splice(idx, 1);

        // if state has no notebook
        if (newState.length === 0)
          return [
            {
              ...demoData,
              createdOn: moment().format("Do MMM, YYYY"),
              time: moment().format("hh:mm a"),
            },
          ];

        return newState;
      }
      return state;

    case UPDATE_NOTEBOOK:
      idx = state.findIndex((notebook) => notebook.id === action.payload.id);
      if (idx !== -1) {
        let newNotebook = {
          ...state[idx],
          [action.payload.name]: action.payload.value,
        };

        let newState = state.slice();
        newState[idx] = newNotebook;

        return newState;
      }
      return state;

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

    case CHANGE_ARRANGEMENT:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          let newNotebook = {
            ...state[i],
            components: arrayMove(
              state[i].components,
              action.payload.from,
              action.payload.to
            ),
          };
          let newState = state.slice();
          newState[i] = newNotebook;
          return newState;
        }
      }
      return state;

    case DELETE_COMPONENT:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          let newNotebook = {
            ...state[i],
            components: newCompo(state[i].components, action.payload.index),
          };

          let newState = state.slice();
          newState[i] = newNotebook;
          return newState;
        }
      }
      return state;

    case CLEAR_ALL_COMPONENTS:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          let newNotebook = {
            ...state[i],
            components: [],
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
