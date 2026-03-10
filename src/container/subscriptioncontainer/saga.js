import { takeEvery, call, put } from "redux-saga/effects";
import commonApi from "../api";
import appConfig from "../../config";
import * as actionType from "./slice";

function* getVendorSubscriptionsSaga() {

  const token = JSON.parse(localStorage.getItem("Token"));

  try {

    const params = {
      api: `${appConfig.ip}/api/admin/subscription`,
      method: "GET",
      authorization: "Bearer",
      token: `${token?.accessToken}`
    };

    const res = yield call(commonApi, params);

    yield put(
      actionType.getVendorSubscriptionsSuccess(res?.data)
    );

  } catch (error) {

    yield put(
      actionType.getVendorSubscriptionsFail(error.message)
    );

  }

}

export default function* adminSubscriptionWatcher() {

  yield takeEvery(
    actionType.getVendorSubscriptions.type,
    getVendorSubscriptionsSaga
  );

}