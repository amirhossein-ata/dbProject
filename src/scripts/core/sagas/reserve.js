import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { request } from "../api/api";

export function* addReserve({ payload }) {
  console.log(payload);
  try {
    yield call(request, `/api/service/reserve/?userId=${payload.userId}`, {
      payload: {
        description: payload.reserve.description,
        sans_id: payload.reserve.sans_id,
        service_id: payload.reserve.service_id,
        date: payload.reserve.date,
      },
      method: "PUT",
    });
    yield put({
      type: ActionTypes.ADD_RESERVE_SUCCESS,
    });
    yield put({
      type: ActionTypes.GET_SERVICE_REQUEST,
      payload: {
        serviceID: payload.reserve.service_id,
        date: payload.startOfWeek,
      },
    });
    payload.successCallback();
  } catch (err) {
    console.log(err);
    payload.failureCallback();
  }
}

export function* getReserves({ payload }) {
  try {
    // const response = yield call(get, "/reserve", {}, payload.token, true);
    // console.log(response);
    const mockedReserves = [];
    yield put({
      type: ActionTypes.GET_RESERVES_SUCCESS,
      payload: mockedReserves,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ADD_RESERVE_REQUEST, addReserve),
    takeLatest(ActionTypes.GET_RESERVES_REQUEST, getReserves),
  ]);
}
