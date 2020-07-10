import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { request } from "../api/api";

export function* postLogin({ payload }) {
  try {
    const response = yield call(
      request,
      "/api/user/",
      { payload, method: "POST" },
      false
    );
    console.log(response);
    yield put({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {
        token: response.access_token,
      },
    });
    yield put({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {
        user: response.user,
      },
    });
    yield put({
      type: ActionTypes.GET_USER_WALLET_REQUEST,
      payload: { userId: response.user.id },
    });
  } catch (err) {
    console.log(err);
  }
}

export function* postSignup({ payload }) {
  try {
    const body = {
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
      email: payload.email,
      nationalCode: payload.nationalCode,
      phoneNumber: payload.phoneNumber,
    };
    const response = yield call(
      request,
      "/api/user/",
      { payload, method: "PUT" },
      false
    );

    yield put({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {
        user: response.user,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.LOGIN_REQUEST, postLogin),
    takeLatest(ActionTypes.SIGNUP_REQUEST, postSignup),
  ]);
}
