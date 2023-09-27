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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        const { status, token } = action.payload;
        if (status === 200) {
          localStorage.setItem("token", token);
          state.loading = "done";
        } else {
          state.loading = "rejected";
        }
      } else {
        state.loading = "rejected";
      }
    });
  },
});

export const { setAuthorized, setRespond, setLoading } = loginSlicer.actions;
export default loginSlicer.reducer;
