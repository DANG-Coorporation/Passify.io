import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "../slicer/loginSlicer";
import signupReducers from "../slicer/signupSlicer";
import eventReducers from "../slicer/eventSlicer";
import dashboardReducers from "../slicer/dahshboardSlicer";
import transactionReducers from "../slicer/transactionSlicer";

const store = configureStore({
  reducer: {
    login: loginReducers,
    signup: signupReducers,
    event: eventReducers,
    dashboard: dashboardReducers,
    transaction: transactionReducers,
  },
});

export default store;
