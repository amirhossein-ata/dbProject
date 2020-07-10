import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  getWalletStatus: "idle",
  getTransactionsStatus: "idle",
  transactions: [],
  wallet: [],
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

    case ActionTypes.GET_TRANSACTIONS_REQUEST:
      return immutable(state, {
        getTransactionsStatus: { $set: "running" },
      });
    case ActionTypes.GET_TRANSACTIONS_SUCCESS:
      return immutable(state, {
        getTransactionsStatus: { $set: "loaded" },
        transactions: { $set: action.payload },
      });

    default:
      return state;
  }
};
