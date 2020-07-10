import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  state: "idle",
  reserves: [],
  businesses: [],
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PROFILE_INFO_REQUEST:
      return immutable(state, {
        state: { $set: "running" },
      });

    case ActionTypes.GET_PROFILE_INFO_SUCCESS:
      return immutable(state, {
        state: { $set: "loaded" },
        reserves: { $set: action.payload.reserves },
        businesses: { $set: action.payload.businseses },
        user: { $set: action.payload.user },
      });
    default:
      return state;
  }
};
