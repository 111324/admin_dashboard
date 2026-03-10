import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "adminSubscription",

  initialState: {
    loading: false,
    error: null,
    vendors: []
  },

  reducers: {

    getVendorSubscriptions: (state) => {
      state.loading = true;
      state.error = null;
    },

    getVendorSubscriptionsSuccess: (state, action) => {
      state.loading = false;
      state.vendors = action.payload;
    },

    getVendorSubscriptionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getVendorSubscriptions,
  getVendorSubscriptionsSuccess,
  getVendorSubscriptionsFail
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;