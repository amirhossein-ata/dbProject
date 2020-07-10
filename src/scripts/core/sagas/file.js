import { takeLatest, call, put, all } from "redux-saga/effects";
import { ActionTypes } from "../actions/actionTyps";
import { request } from "../api/api";

export function* uploadFile({ payload }) {
  try {
    if (payload.type === "business") {
      console.log(payload);
      // const response = yield call(
      //   request,
      //   `/api/business/?userId=${payload.userID}`,
      //   {
      //     payload: {
      //       address: payload.business.address,
      //       name: payload.business.name,
      //       description: payload.business.description,
      //       phone_number: payload.business.phoneNumber,
      //       category: payload.business.category,
      //     },
      //     method: "PUT",
      //   }
      // );
      yield put({
        type: "d",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.UPLOAD_FILE_REQUEST, uploadFile)]);
}
