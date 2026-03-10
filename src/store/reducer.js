import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import loginReducer from 'container/LoginContainer/slice';
import orderReducer from "../container/orderContainer/slice"
import vendorReducer from "../container/vendorContainer/slice"
import categiesReducer from "../container/categoryContainer/slice"
import subreducer from "../container/subscriptioncontainer/slice"

const reducer = combineReducers({
  login: loginReducer,
  customization: customizationReducer,
  order: orderReducer,
  vendor:vendorReducer,
  category:categiesReducer,
  subscription:subreducer,
});

export default reducer;
