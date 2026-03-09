import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFail
} from "./slice";

/* API */

const getOrdersApi = () =>
  axios.get(
    "http://localhost:5000/api/all-orders",
    { withCredentials: true }
  );

/* SAGA */

function* getOrdersSaga() {

  try {

    const response = yield call(getOrdersApi);

    console.log("API RESPONSE:", response.data); // 👈 ADD

    yield put(getOrdersSuccess(response.data.orders));

  } catch (error) {

    console.log("API ERROR:", error.response); // 👈 ADD

    yield put(
      getOrdersFail(
        error.response?.data?.message || "Failed to fetch orders"
      )
    );

  }

}

/* WATCHER */

function* orderActionWatcher() {

  yield takeLatest(getOrdersRequest.type, getOrdersSaga);

}

export default orderActionWatcher;