import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postSignup } from "../../../api/signup";

export const userSignup = createAsyncThunk("signup/post", async (apiData) => {
  try {
    const res = await postSignup(apiData);
    const data = await res.data;
    return data;
  } catch (e) {
    return e.toString();
  }
});

const signupSlicer = createSlice({
  name: "signup",
  initialState: {
    loading: "idle",
    respond: {},
  },
  extraReducers: (builder) => {
    builder.addCase(userSignup.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(userSignup.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        const { status } = action.payload;
        if (status === 200) {
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

export default signupSlicer.reducer;
