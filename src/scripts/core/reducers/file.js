import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  uploadFileLoadStatus: "idle",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPLOAD_FILE_REQUEST:
      return immutable(state, {
        uploadFileLoadStatus: { $set: "running" },
      });

    case ActionTypes.UPLOAD_FILE_SUCCESS:
      return immutable(state, {
        uploadFileLoadStatus: { $set: "loaded" },
      });

    case ActionTypes.SET_UPLOAD_FILE_STATUS:
      return immutable(state, {
        uploadFileLoadStatus: { $set: action.payload.status },
      });
    default:
      return state;
  }
};
