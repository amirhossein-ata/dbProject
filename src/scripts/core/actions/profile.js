import { ActionTypes } from "./actionTyps";

export const get_profile_info = (userId) => ({
  type: ActionTypes.GET_PROFILE_INFO_REQUEST,
  payload: { userId },
});
