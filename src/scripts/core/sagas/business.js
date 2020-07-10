import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { request } from "../api/api";

export function* addBusiness({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/business/?userId=${payload.userID}`,
      {
        payload: {
          address: payload.business.address,
          name: payload.business.name,
          description: payload.business.description,
          phone_number: payload.business.phoneNumber,
          category: payload.business.category,
        },
        method: "PUT",
      }
    );
    yield put({
      type: ActionTypes.GET_PROFILE_INFO_REQUEST,
      payload: { userId: payload.userID },
    });
  } catch (err) {
    console.log(err);
  }
}

export function* getBusinesses({ payload }) {
  try {
    const response = yield call(request, `/api/business/search/`, {
      payload: {},
      method: "GET",
    });
    yield put({
      type: ActionTypes.GET_BUSINESSES_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* getBusiness({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/business/?business_id=${payload.businessID}`,
      {
        payload: {},
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.GET_BUSINESS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* editBusiness({ payload }) {
  try {
    console.log(payload);
    const response = yield call(
      request,
      `/api/business/?userId=${payload.userID}`,
      {
        payload: {
          name: payload.business.name,
          description: payload.business.description,
          id: payload.business.id,
          phone_number: payload.business.phoneNumber,
          category: payload.business.category,
          address: payload.business.address,
        },
        method: "PATCH",
      }
    );
    yield put({
      type: ActionTypes.EDIT_BUSINESS_SUCCESS,
      payload: { business: response.business, pictures: response.pictures },
    });
  } catch (err) {
    console.log(err);
  }
}

export function* getBusinessDashboard({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/dashboard?id=${payload.businessId}`,
      {
        payload: {},
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.GET_BUSINESS_DASHBOARD_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ADD_BUSINESS_REQUEST, addBusiness),
    takeLatest(ActionTypes.GET_BUSINESSES_REQUEST, getBusinesses),
    takeLatest(ActionTypes.GET_BUSINESS_REQUEST, getBusiness),
    takeLatest(ActionTypes.EDIT_BUSINESS_REQUEST, editBusiness),
    takeLatest(
      ActionTypes.GET_BUSINESS_DASHBOARD_REQUEST,
      getBusinessDashboard
    ),
  ]);
}
