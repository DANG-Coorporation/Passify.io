import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "../slicer/loginSlicer";
import signupReducers from "../slicer/signupSlicer";

const store = configureStore({
  reducer: {
    login: loginReducers,
    signup: signupReducers,
  },
});

export default store;
