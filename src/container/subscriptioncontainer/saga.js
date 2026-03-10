import { takeEvery, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import commonApi from "../api";
import appConfig from "../../config";
import * as actionType from "./slice";

/* ================= ADMIN UPSERT SUBSCRIPTION ================= */

function* adminUpsertSubscription(action) {

  const token = JSON.parse(localStorage.getItem("Token"));

  const body = {
    vendorId: action.payload.vendorId,
    plan: action.payload.plan,
    status: action.payload.status
  };

  try {

    const params = {
      api: `${appConfig.ip}/api/subscription`,
      method: "POST",
      successAction: actionType.adminUpsertSubscriptionSuccess(),
      failAction: actionType.adminUpsertSubscriptionFail(),
      authorization: "Bearer",
      token: `${token?.accessToken}`,
      body
    };

    const res = yield call(commonApi, params);

    if (res) {

      yield put(actionType.adminUpsertSubscriptionSuccess(res));

      yield call(
        toast.success,
        "Subscription saved successfully",
        { autoClose: 3000 }
      );

    } else {

      yield call(
        toast.error,
        "Subscription update failed",
        { autoClose: 3000 }
      );

    }

  } catch (error) {

    console.error("Subscription error:", error);

    yield put(
      actionType.adminUpsertSubscriptionFail({
        message: error.message
      })
    );

    yield call(
      toast.error,
      "Subscription update failed",
      { autoClose: 3000 }
    );

  }
}

/* ================= WATCHER ================= */

export default function* adminSubscriptionWatcher() {

  yield takeEvery(
    actionType.adminUpsertSubscription.type,
    adminUpsertSubscription
  );

}