import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  createVendorRequest,
  createVendorSuccess,
  createVendorFail,
  getVendorRequest,
  getVendorSuccess,
  getVendorFail
} from "./slice";

/* ================= API ================= */

const createVendorApi = (data) =>
  axios.post(
    "http://localhost:5000/api/createvendor",
    data,
    { withCredentials: true }
  );

const getVendorApi = () =>
  axios.get(
    "http://localhost:5000/api/vendors",
    { withCredentials: true }
  );

/* ================= CREATE VENDOR ================= */

function* createVendorSaga(action) {
  try {

    const response = yield call(createVendorApi, action.payload);

    // backend returns { message , vendor }
    const vendor = response?.data?.vendor;

    yield put(createVendorSuccess(vendor));

  } catch (error) {

    const message =
      error?.response?.data?.message || "Vendor creation failed";

    yield put(createVendorFail(message));
  }
}

/* ================= GET VENDORS ================= */

function* getVendorSaga() {
  try {

    const response = yield call(getVendorApi);

    // backend returns { vendors }
    const vendors = response?.data?.vendors;

    yield put(getVendorSuccess(vendors));

  } catch (error) {

    const message =
      error?.response?.data?.message || "Failed to fetch vendors";

    yield put(getVendorFail(message));
  }
}

/* ================= WATCHER ================= */

function* vendorSaga() {

  yield takeLatest(createVendorRequest.type, createVendorSaga);

  yield takeLatest(getVendorRequest.type, getVendorSaga);

}

export default vendorSaga;