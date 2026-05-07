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
       UPDATE VENDOR
    ========================= */

    updateVendorRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },

    updateVendorSuccess: (state, action) => {
      state.loading = false;
      state.success = true;

      // update vendor in list
      const index = state.vendors.findIndex(
        (v) => v._id === action.payload._id
      );
      if (index !== -1) {
        state.vendors[index] = action.payload;
      }
    },

    updateVendorFail: (state, action) => {
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

  updateVendorRequest,
  updateVendorSuccess,
  updateVendorFail,

  resetVendorState
} = vendorSlice.actions;

export default vendorSlice.reducer;