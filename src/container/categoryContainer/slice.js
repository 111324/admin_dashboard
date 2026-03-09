import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null
};

const eventTypeSlice = createSlice({
  name: "eventTypes",
  initialState,
  reducers: {

    getEventTypesRequest: (state) => {
      state.loading = true;
    },

    getEventTypesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },

    getEventTypesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createEventTypeRequest: (state) => {
      state.loading = true;
    },

    createEventTypeSuccess: (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
    },

    createEventTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getEventTypesRequest,
  getEventTypesSuccess,
  getEventTypesFail,
  createEventTypeRequest,
  createEventTypeSuccess,
  createEventTypeFail
} = eventTypeSlice.actions;

export default eventTypeSlice.reducer;