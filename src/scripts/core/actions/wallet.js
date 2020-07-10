import { ActionTypes } from "./actionTyps";

export const get_user_wallet = (userId) => ({
  type: ActionTypes.GET_USER_WALLET_REQUEST,
  payload: { userId },
});

export const create_wallet = (userId, name) => ({
  type: ActionTypes.CREATE_WALLET_REQUEST,
  payload: { userId, name },
});

export const edit_wallet = (userId, walletId, name, successCallback) => ({
  type: ActionTypes.EDIT_WALLET_REQUEST,
  payload: { userId, walletId, name, successCallback },
});

export const wallet_checkout = (userId, walletId, amount, successCallback) => ({
  type: ActionTypes.WALLET_CHECKOUT_REQUEST,
  payload: { userId, walletId, amount, successCallback },
});

export const get_transactions = (
  userId,
  min_amount,
  walletId,
  to_date,
  from_date,
  amount
) => ({
  type: ActionTypes.GET_TRANSACTIONS_REQUEST,
  payload: { userId, min_amount, walletId, to_date, from_date, amount },
});
