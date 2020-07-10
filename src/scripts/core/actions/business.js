import { ActionTypes } from "./actionTyps";

export const add_business = (business, userID) => ({
  type: ActionTypes.ADD_BUSINESS_REQUEST,
  payload: { business, userID },
});

export const get_businesses = (token) => ({
  type: ActionTypes.GET_BUSINESSES_REQUEST,
  payload: { token },
});

export const get_business = (businessID, userID) => ({
  type: ActionTypes.GET_BUSINESS_REQUEST,
  payload: { businessID, userID },
});

export const edit_business = (business, userID) => ({
  type: ActionTypes.EDIT_BUSINESS_REQUEST,
  payload: { business, userID },
});

export const setBusinessesLoadStatus = (status) => ({
  type: ActionTypes.SET_BUSINESSES_LOAD_STATUS,
  payload: { status },
});

export const setBusinessDetailLoadStatus = (status) => ({
  type: ActionTypes.SET_BUSINESS_DETAIL_LOAD_STATUS,
  payload: { status },
});

export const get_business_dashboard = (businessId) => ({
  type: ActionTypes.GET_BUSINESS_DASHBOARD_REQUEST,
  payload: { businessId },
});
