import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  commentsLoadStatus: "idle",
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COMMENTS_REQUEST:
      return immutable(state, {
        commentsLoadStatus: { $set: "running" },
      });

    case ActionTypes.GET_COMMENTS_SUCCESS:
      return immutable(state, {
        commentsLoadStatus: { $set: "loaded" },
        comments: { $set: action.payload },
      });

    default:
      return state;
  }
};
