import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "../slicer/loginSlicer";

const store = configureStore({
  reducer: {
    login: loginReducers,
  },
});

export default store;
