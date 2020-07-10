import { ActionTypes } from "./actionTyps";

export const loginRequest = credentials => ({
  type: ActionTypes.LOGIN_REQUEST,
  payload: credentials
});

export const logout = () => ({
  type: ActionTypes.LOGOUT
});

export const signupRequest = credentials => ({
  type: ActionTypes.SIGNUP_REQUEST,
  payload: credentials
});
