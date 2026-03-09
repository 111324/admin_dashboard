import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  getEventTypesRequest,
  getEventTypesSuccess,
  getEventTypesFail,
  createEventTypeRequest,
  createEventTypeSuccess,
  createEventTypeFail
} from "./slice";

const API = "http://localhost:5000/api";

/* GET EVENT TYPES */

function* getEventTypes() {
  try {

    const res = yield call(axios.get, `${API}/eventtypes`, {
      withCredentials: true
    });

    yield put(getEventTypesSuccess(res.data.data));

  } catch (error) {

    yield put(getEventTypesFail(error.message));

  }
}


/* CREATE EVENT TYPE */

function* createEventType(action) {

  try {

    const res = yield call(
      axios.post,
      `${API}/eventtypes`,
      { name: action.payload },
      { withCredentials: true }
    );

    yield put(createEventTypeSuccess(res.data.data));

  } catch (error) {

    yield put(createEventTypeFail(error.message));

  }

}

export default function* eventTypeSaga() {

  yield takeLatest(getEventTypesRequest.type, getEventTypes);
  yield takeLatest(createEventTypeRequest.type, createEventType);

}