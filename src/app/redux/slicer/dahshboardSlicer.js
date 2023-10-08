import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboardDetail } from "../../../api/getDashboardDetail";
import { AxiosError } from "axios";

export const fetchDashboardDetail = createAsyncThunk(
  "dashboard/get",
  async (userId) => {
    try {
      const res = await getDashboardDetail(userId);
      const data = await res.data;
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return {
          status: e.status,
          message: e.message,
          data: e.response.data,
        };
      } else {
        return e.toString();
      }
    }
  }
);

const dashboardSlicer = createSlice({
  name: "dashboard",
  initialState: {
    details: {},
    loading: "idle",
  },
  reducers: {
    resetDashboard: (state) => {
      state.loading = "idle";
      state.details = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardDetail.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(fetchDashboardDetail.fulfilled, (state, action) => {
      const { status } = action.payload;
      if (status === 200) {
        state.loading = "done";
        state.details = action.payload.data;
      } else {
        state.loading = "rejected";
      }
    });

    builder.addCase(fetchDashboardDetail.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export const { resetDashboard } = dashboardSlicer.actions;
export default dashboardSlicer.reducer;
