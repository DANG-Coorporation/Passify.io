import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getTransactionPermission from "../../../api/getTransactionPermission";
import { AxiosError } from "axios";

export const getBookPermission = createAsyncThunk(
  "transaction/permission",
  async (payload) => {
    try {
      const res = await getTransactionPermission(
        payload.user_id,
        payload.event_id
      );
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

const transactionSlicer = createSlice({
  name: "transaction",
  initialState: {
    loading: "idle",
    isPermitted: true,
    isOwner: false,
  },
  reducers: {
    resetTransactionState: (state) => {
      (state.isOwner = false),
        (state.isPermitted = true),
        (state.loading = "idle");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookPermission.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getBookPermission.fulfilled, (state, action) => {
      const { status, data } = action.payload;
      console.log(data);
      if (status === 200) {
        state.loading = "done";
        state.isPermitted = data.permission;
        state.isOwner = data.owner;
      } else {
        state.loading = "rejected";
      }
    });
  },
});

export const { resetTransactionState } = transactionSlicer.actions;
export default transactionSlicer.reducer;
