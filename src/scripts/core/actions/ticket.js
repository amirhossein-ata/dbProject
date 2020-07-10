import { ActionTypes } from "./actionTyps";

export const add_ticket = (
  text,
  files,
  userId,
  businessId,
  successCallback,
  failureCallback
) => ({
  type: ActionTypes.ADD_TICKET_REQUEST,
  payload: {
    text,
    files,
    userId,
    businessId,
    successCallback,
    failureCallback,
  },
});

export const get_tickets = (businessId, userId) => ({
  type: ActionTypes.GET_BUSINESS_TICKETS_REQUEST,
  payload: { businessId, userId },
});

export const add_message_to_ticket = (
  files,
  text,
  ticketId,
  userId,
  businessId,
  successCallback,
  failureCallback
) => ({
  type: ActionTypes.ADD_MESSAGE_TO_TICKET_REQUEST,
  payload: {
    files,
    text,
    ticketId,
    userId,
    businessId,
    successCallback,
    failureCallback,
  },
});

export const selectTicket = (ticket) => ({
  type: ActionTypes.SELECT_TICKET,
  payload: { ticket },
});
