import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import orderActionWatcher from 'container/orderContainer/saga'
import vendorSaga from "container/vendorContainer/saga";
import eventTypeSaga from "container/categoryContainer/saga"
import subscriptionsaga from "container/subscriptioncontainer/saga"


function* rootSaga() {
  yield all([
    call(LoginActionWatcher),
    call(orderActionWatcher),
    call(vendorSaga),
    call(eventTypeSaga),
    call(subscriptionsaga),
  ]);
}

export default rootSaga;
