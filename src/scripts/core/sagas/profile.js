import { takeLatest, call, put } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { request } from "../api/api";

export function* getProfileInfo({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/user/?userId=${payload.userId}`,
      { payload: {}, method: "GET" },
      false
    );
    yield put({
      type: ActionTypes.GET_PROFILE_INFO_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield takeLatest(ActionTypes.GET_PROFILE_INFO_REQUEST, getProfileInfo);
}
