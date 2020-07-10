import { ActionTypes } from "./actionTyps";

export const uploadFile = (file, id, type) => {
  return {
    type: ActionTypes.UPLOAD_FILE_REQUEST,
    payload: { file, type, id },
  };
};

export const setFileUploadLoadStatus = (status) => {
  return {
    type: ActionTypes.SET_UPLOAD_FILE_STATUS,
    payload: { status },
  };
};
