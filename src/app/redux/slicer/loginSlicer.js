import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postLogin from "../../../api/login";
import { AxiosError } from "axios";

export const userLogin = createAsyncThunk(
  "loginSlicer/login",
  async (apiData) => {
    try {
      const res = await postLogin(apiData);
      const data = await res.data;
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return e.response.data;
      } else {
        return e.toString();
      }
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
      const { status, token } = action.payload;
      if (status === 200) {
        localStorage.setItem("token", token);
        state.loading = "done";
      } else {
        state.respond = action.payload;
        state.loading = "rejected";
      }
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = "done";
      state.respond = action.payload;
    });
  },
});

export const { setAuthorized, setRespond, setLoading } = loginSlicer.actions;
export default loginSlicer.reducer;
