import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  createVendorRequest,
  createVendorSuccess,
  createVendorFail,
  getVendorRequest,
  getVendorSuccess,
  getVendorFail,
  updateVendorRequest,
  updateVendorSuccess,
  updateVendorFail
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

const updateVendorApi = (id, data) =>
  axios.put(
    `http://localhost:5000/api/updatevendor/${id}`,
    data,
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

/* ================= UPDATE VENDOR ================= */

function* updateVendorSaga(action) {
  try {
    const { id, data } = action.payload;

    const response = yield call(updateVendorApi, id, data);

    const vendor = response?.data?.vendor;

    yield put(updateVendorSuccess(vendor));

  } catch (error) {

    const message =
      error?.response?.data?.message || "Vendor update failed";

    yield put(updateVendorFail(message));
  }
}

/* ================= WATCHER ================= */

function* vendorSaga() {

  yield takeLatest(createVendorRequest.type, createVendorSaga);

  yield takeLatest(getVendorRequest.type, getVendorSaga);

  yield takeLatest(updateVendorRequest.type, updateVendorSaga);

}

export default vendorSaga;