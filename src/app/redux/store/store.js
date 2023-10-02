import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "../slicer/loginSlicer";
import signupReducers from "../slicer/signupSlicer";
import eventReducers from "../slicer/eventSlicer";

const store = configureStore({
  reducer: {
    login: loginReducers,
    signup: signupReducers,
    event: eventReducers,
  },
});

export default store;
