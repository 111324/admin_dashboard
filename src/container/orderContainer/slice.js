import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [],
  error: null
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {

    getOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },

    getOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFail
} = orderSlice.actions;

export default orderSlice.reducer;