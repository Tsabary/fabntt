import { FETCH_PROJECTS, NEW_PROJECT } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.payload;

      case NEW_PROJECT:
        return [...state, action.payload];



    default:
      return state;
  }
};
