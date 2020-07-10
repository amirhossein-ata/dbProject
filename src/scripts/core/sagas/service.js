import { takeLatest, call, put, all } from "redux-saga/effects";
import moment from "moment";
import { ActionTypes } from "../actions/actionTyps";
import { request } from "../api/api";

const createTimetable = (timetableData) => {
  const { startTime, endTime } = timetableData;
  let result = [];
  for (let index = 0; index < 7; index++) {
    let temp = moment(`${startTime}:${startTime}`, "h:mm");
    const end = moment(`${endTime}:${endTime}`, "h:mm");
    const time_length_int = 60;
    const gap_length_int = 0;
    while (temp < end) {
      let hour = temp.hour();
      let minute = temp.minute();
      if (minute + time_length_int >= 60) {
        hour++;
        minute = minute + time_length_int - 60;
      } else {
        minute = minute + time_length_int;
      }
      const end_sans =
        minute === 0
          ? "" + hour + ":" + minute + "0"
          : "" + hour + ":" + minute;
      const start_sans =
        temp.minute() === 0
          ? "" + temp.hour() + ":" + temp.minute() + "0"
          : "" + temp.hour() + ":" + temp.minute();
      result.push({ weekday: index, startTime: start_sans, endTime: end_sans });
      if (minute + gap_length_int >= 60) {
        hour++;
        minute = minute + gap_length_int - 60;
      } else {
        minute = minute + gap_length_int;
      }

      temp = "" + hour + ":" + minute;
      temp = moment(temp, "h:mm");
    }
  }
  return result;
};

export function* addService({ payload }) {
  try {
    const timetable = createTimetable({
      startTime: payload.service.start_day,
      endTime: payload.service.end_day,
    });
    const body = {
      name: payload.service.name,
      description: payload.service.description,
      price: payload.service.price,
      days: timetable,
      cancellation_range: payload.service.cancellationRange,
      business_id: payload.service.business_id,
      address: payload.service.address,
      reviewCount: 300,
    };
    // console.log(body);
    yield call(request, `/api/service/?userId=${payload.userID}`, {
      payload: body,
      method: "PUT",
    });
    yield put({
      type: ActionTypes.GET_BUSINESS_REQUEST,
      payload: { businessID: payload.service.business_id },
    });
    payload.closeModal();
  } catch (err) {
    console.log(err);
  }
}

export function* getService({ payload }) {
  try {
    const response = yield call(
      request,
      `/api/service/?service_id=${payload.serviceID}&date=${payload.date}`,
      {
        payload: {},
        method: "GET",
      }
    );
    yield put({
      type: ActionTypes.GET_SERVICE_SUCCESS,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}
export function* editService({ payload }) {
  console.log(payload);
  try {
    const response = yield call(
      request,
      `/api/service/?userId=${payload.userId}`,
      {
        payload: {
          address: payload.service.address,
          cancellation_range: payload.service.cancellationRange,
          description: payload.service.description,
          sanses: [],
          id: payload.service.id,
          name: payload.service.name,
          price: payload.service.price,
          walletId: payload.service.walletId,
        },
        method: "PATCH",
      }
    );
    yield put({
      type: ActionTypes.GET_SERVICE_REQUEST,
      payload: {
        serviceID: payload.service.id,
        date: moment().format("YYYY-MM-DD"),
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.ADD_SERVICE_REQUEST, addService),
    takeLatest(ActionTypes.GET_SERVICE_REQUEST, getService),
    takeLatest(ActionTypes.EDIT_SERVICE_REQUEST, editService),
  ]);
}
