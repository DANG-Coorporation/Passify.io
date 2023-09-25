import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postLogin from "../../../api/login";

export const userLogin = createAsyncThunk(
  "loginSlicer/login",
  async (apiData) => {
    try {
      const res = await postLogin(apiData);
      const data = await res.data;
      return data;
    } catch (e) {
      return e.toString();
    }
  }
);

const loginSlicer = createSlice({
  name: "loginSlicer",
  initialState: {
    isAuthorized: false,
    loading: "idle",
    respond: {},
  },
  reducers: {
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    setRespond: (state, action) => {
      state.respond = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        console.log(action.payload);
        const { status, token } = action.payload;
        console.log(status);
        if (status === 200) {
          localStorage.setItem("jwt", token);
          state.loading = "done";
        } else {
          console.log("here bro");
          state.loading = "rejected";
        }
      } else {
        console.log("here ges");
        state.loading = "rejected";
      }
    });
  },
});

export const { setAuthorized, setRespond } = loginSlicer.actions;
export default loginSlicer.reducer;
