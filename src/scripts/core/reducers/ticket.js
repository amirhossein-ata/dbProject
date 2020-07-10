import { ActionTypes } from "../actions/actionTyps";
import immutable from "immutability-helper";

const initialState = {
  ticketsLoadStatus: "idle",
  tickets: [],
  selectedTicket: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TICKET_SUCCESS:
      return immutable(state, {
        ticketsLoadStatus: { $set: "loaded" },
      });

    case ActionTypes.GET_BUSINESS_TICKETS_REQUEST:
      return immutable(state, {
        ticketsLoadStatus: { $set: "running" },
      });
    case ActionTypes.GET_BUSINESS_TICKETS_SUCCESS:
      return immutable(state, {
        ticketsLoadStatus: { $set: "loaded" },
        tickets: { $set: action.payload.ticket.data },
      });
    case ActionTypes.ADD_MESSAGE_TO_TICKET_SUCCESS:
      return immutable(state, {
        ticketsLoadStatus: { $set: "loaded" },
        selectedTicket: { $set: action.payload.ticket },
      });
    case ActionTypes.SELECT_TICKET:
      return immutable(state, {
        selectedTicket: { $set: action.payload.ticket },
      });
    default:
      return state;
  }
};
