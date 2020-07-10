import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { request } from "../api/api";

export function* addTicket({ payload }) {
  try {
    console.log(payload);
    const response = yield call(
      request,
      `/api/ticket/?userId=${payload.userId}`,
      {
        payload: {
          userId: payload.userId,
          businessId: payload.businessId,
          files: payload.files,
          text: payload.text,
        },
        method: "PUT",
      }
    );
    yield put({
      type: ActionTypes.ADD_TICKET_SUCCESS,
      payload: response,
    });
    payload.successCallback();
  } catch (err) {
    console.log(err);
    payload.failureCallback();
  }
}

export function* addMessageToTicket({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/ticket/?userId=${payload.userId}`,
      {
        payload: {
          ticketId: payload.ticketId,
          businessId: payload.businessId,
          files: payload.files,
          text: payload.text,
        },
        method: "POST",
      }
    );
    yield put({
      type: ActionTypes.ADD_MESSAGE_TO_TICKET_SUCCESS,
      payload: response,
    });
    payload.successCallback();
    yield put({
      type: ActionTypes.GET_BUSINESS_TICKETS_REQUEST,
      payload: { userId: payload.userId, businessId: payload.businessId },
    });
  } catch (err) {
    console.log(err);
    payload.failureCallback();
  }
}

export function* getBusinessTickets({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/ticket/search/?userId=${payload.userId}&businessId=${payload.businessId}`,
      {
        payload: {},
        method: "GET",
      }
    );
    console.log(response);
    yield put({
      type: ActionTypes.GET_BUSINESS_TICKETS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ADD_TICKET_REQUEST, addTicket),
    takeLatest(ActionTypes.ADD_MESSAGE_TO_TICKET_REQUEST, addMessageToTicket),
    takeLatest(ActionTypes.GET_BUSINESS_TICKETS_REQUEST, getBusinessTickets),
  ]);
}
