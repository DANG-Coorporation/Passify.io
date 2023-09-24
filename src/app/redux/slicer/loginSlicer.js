import { createSlice } from "@reduxjs/toolkit";

const loginSlicer = createSlice({
  initialState: {
    isAuthorized: false,
  },
  reducers: {
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
  },
});
