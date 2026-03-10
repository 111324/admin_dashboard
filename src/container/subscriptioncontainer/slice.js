import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "adminSubscription",

  initialState: {
    loading: false,
    error: null,
    data: null
  },

  reducers: {

    /* CREATE / UPDATE SUBSCRIPTION */

    adminUpsertSubscription: (state) => {
      state.loading = true;
      state.error = null;
    },

    adminUpsertSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    adminUpsertSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  adminUpsertSubscription,
  adminUpsertSubscriptionSuccess,
  adminUpsertSubscriptionFail
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;