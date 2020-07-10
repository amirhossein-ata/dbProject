import { ActionTypes } from "./actionTyps";

export const add_service = (service, userID, closeModal) => ({
  type: ActionTypes.ADD_SERVICE_REQUEST,
  payload: { service, userID, closeModal },
});

export const get_service = (serviceID, date) => ({
  type: ActionTypes.GET_SERVICE_REQUEST,
  payload: { serviceID, date },
});

export const setServiceLoadStatus = (status) => ({
  type: ActionTypes.SET_SERVICE_LOAD_STATUS,
  payload: { status },
});

export const edit_service = (service, userId, closeModal) => ({
  type: ActionTypes.EDIT_SERVICE_REQUEST,
  payload: { service, userId, closeModal },
});
