import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { request } from "../api/api";

export function* getUserWallet({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/wallet/?userId=${payload.userId}`,
      {
        payload: {},
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.GET_USER_WALLET_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* createWallet({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/wallet/?userId=${payload.userId}`,
      {
        payload: {
          name: payload.name,
        },
        method: "PUT",
      }
    );
    yield put({
      type: ActionTypes.CREATE_WALLET_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
    payload.failureCallback();
  }
}

export function* editWallet({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/wallet/?userId=${payload.userId}`,
      {
        payload: { walletId: payload.walletId, name: payload.name },
        method: "PATCH",
      }
    );
    yield put({
      type: ActionTypes.EDIT_WALLET_SUCCESS,
      payload: response,
    });
    payload.successCallback();
  } catch (err) {
    console.log(err);
  }
}
export function* walletCheckout({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/wallet/?userId=${payload.userId}`,
      {
        payload: { walletId: payload.walletId, amount: payload.amount },
        method: "POST",
      }
    );
    yield put({
      type: ActionTypes.WALLET_CHECKOUT_SUCCESS,
      payload: response,
    });
    payload.successCallback();
  } catch (err) {
    console.log(err);
  }
}
export function* getTransactions({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/wallet/transaction/?userId=${payload.userId}`,
      {
        payload: {},
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.GET_TRANSACTIONS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}
export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_USER_WALLET_REQUEST, getUserWallet),
    takeLatest(ActionTypes.CREATE_WALLET_REQUEST, createWallet),
    takeLatest(ActionTypes.EDIT_WALLET_REQUEST, editWallet),
    takeLatest(ActionTypes.WALLET_CHECKOUT_REQUEST, walletCheckout),
    takeLatest(ActionTypes.GET_TRANSACTIONS_REQUEST, getTransactions),
  ]);
}
