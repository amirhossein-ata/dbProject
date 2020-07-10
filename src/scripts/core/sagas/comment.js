import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { request } from "../api/api";

export function* addComment({ payload }) {
  console.log(payload);
  try {
    const response = yield call(
      request,
      `/api/service/review/?userId=${payload.userId}`,
      {
        payload: {
          point: payload.point,
          description: payload.description,
          reserve_id: payload.reserveId,
        },
        method: "PUT",
      }
    );
    yield put({
      type: ActionTypes.ADD_COMMENT_SUCCESS,
      payload: response,
    });
    payload.successCallback();
  } catch (err) {
    console.log(err);
    payload.failureCallback();
  }
}

export function* getComments({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/service/review/?service_id=${payload.serviceId}&page=0&size=50`,
      { payload: {}, method: "GET" }
    );
    yield put({
      type: ActionTypes.GET_COMMENTS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ADD_COMMENT_REQUEST, addComment),
    takeLatest(ActionTypes.GET_COMMENTS_REQUEST, getComments),
  ]);
}
