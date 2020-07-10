import { ActionTypes } from "./actionTyps";

export const add_comment = (
  point,
  description,
  reserveId,
  userId,
  successCallback,
  failureCallback
) => ({
  type: ActionTypes.ADD_COMMENT_REQUEST,
  payload: {
    point,
    description,
    reserveId,
    userId,
    successCallback,
    failureCallback,
  },
});

export const get_comments = (serviceId) => ({
  type: ActionTypes.GET_COMMENTS_REQUEST,
  payload: { serviceId },
});
