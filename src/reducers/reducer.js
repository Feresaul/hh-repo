import * as actions from "../actionTypes";

export function bugs(state = {}, action) {
  switch (action.type) {
    case actions.BUG_ADD:
      return [...state, action.payload];

    case actions.BUG_EDIT:
      return state.map((item) =>
        item.id !== action.payload.id
          ? item
          : { id: action.payload.id, description: action.payload.description }
      );
    case actions.BUG_REMOVE:
      return state.filter((item) => item.id !== action.payload.id);

    default:
      return state;
  }
}
