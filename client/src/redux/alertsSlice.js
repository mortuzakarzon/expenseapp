import { createSlice } from "@reduxjs/toolkit";

// slice for managing loading state
export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    // action to show loading state
    showLoading: (state) => {
      state.loading = true;
    },
    // action to hide loading state
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertsSlice.actions;
