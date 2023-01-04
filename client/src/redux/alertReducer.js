import { createSlice } from "@reduxjs/toolkit";

// alerts slice of the Redux store
export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    // show the loading indicator
    showLoading: (state) => {
      state.loading = true;
    },
    // hide the loading indicator
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertsSlice.actions;
