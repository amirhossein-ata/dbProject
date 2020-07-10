import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  serviceLoadStatus: "idle",
  serviceDetail: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SERVICE_REQUEST:
      return immutable(state, {
        serviceLoadStatus: { $set: "running" },
      });

    case ActionTypes.GET_SERVICE_SUCCESS:
      return immutable(state, {
        serviceLoadStatus: { $set: "loaded" },
        serviceDetail: { $set: action.payload },
      });

    case ActionTypes.SET_SERVICE_LOAD_STATUS:
      return immutable(state, {
        serviceLoadStatus: { $set: action.payload.status },
      });
    default:
      return state;
  }
};
