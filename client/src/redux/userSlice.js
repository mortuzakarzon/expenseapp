import { createSlice } from "@reduxjs/toolkit";

// define the user slice of the Redux store
export const userSlice = createSlice({
  name: "user",
  initialState: {
    // initialize the user state to null
    user: null
  },
  reducers: {
    // define the setUser reducer to set the user state
    setUser: (state , action) => {
      state.user = action.payload;
    }
  },
});

// extract the setUser action from the user slice
export const { setUser , reloadUserData } = userSlice.actions;
