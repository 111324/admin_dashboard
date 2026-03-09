import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  vendors: [],
  error: null,
  success: false
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {

    /* =========================
       CREATE VENDOR
    ========================= */

    createVendorRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },

    createVendorSuccess: (state, action) => {
      state.loading = false;
      state.success = true;

      // add new vendor to list
      state.vendors.push(action.payload);
    },

    createVendorFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },



    /* =========================
       GET VENDORS
    ========================= */

    getVendorRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getVendorSuccess: (state, action) => {
      state.loading = false;

      // replace vendor list from DB
      state.vendors = action.payload;
    },

    getVendorFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },



    /* =========================
       RESET
    ========================= */

    resetVendorState: (state) => {
      state.success = false;
      state.error = null;
    }

  }
});

export const {
  createVendorRequest,
  createVendorSuccess,
  createVendorFail,

  getVendorRequest,
  getVendorSuccess,
  getVendorFail,

  resetVendorState
} = vendorSlice.actions;

export default vendorSlice.reducer;