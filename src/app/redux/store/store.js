import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "../slicer/loginSlicer";
import signupReducers from "../slicer/signupSlicer";
import eventReducers from "../slicer/eventSlicer";
import dashboardReducers from "../slicer/dahshboardSlicer";

const store = configureStore({
  reducer: {
    login: loginReducers,
    signup: signupReducers,
    event: eventReducers,
    dashboard: dashboardReducers,
  },
});

export default store;
