import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  state: "idle",
  reserves: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_RESERVES_REQUEST:
      return immutable(state, {
        state: { $set: "running" }
      });

    case ActionTypes.GET_RESERVES_SUCCESS:
      return immutable(state, {
        state: { $set: "loaded" },
        reserves: { $set: action.payload }
      });
    default:
      return state;
  }
};
