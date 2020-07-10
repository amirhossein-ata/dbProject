import { ActionTypes } from "./actionTyps";

export const get_reserves = (serviceID, token) => ({
  type: ActionTypes.GET_RESERVES_REQUEST,
  payload: { serviceID, token },
});

export const add_reserve = (
  reserve,
  userId,
  startOfWeek,
  successCallback,
  failureCallback
) => ({
  type: ActionTypes.ADD_RESERVE_REQUEST,
  payload: { reserve, userId, startOfWeek, successCallback, failureCallback },
});
