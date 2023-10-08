import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getEvent from "../../../api/getEvent";
import getEventById from "../../../api/getEventsById";

export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  try {
    const res = await getEvent();
    const data = await res.data;
    return data;
  } catch (e) {
    return e.string();
  }
});

export const fetchEventById = createAsyncThunk(
  "event/fetchEventById",
  async (eventId) => {
    try {
      const res = await getEventById(eventId);
      const data = await res.data;
      return data;
    } catch (e) {
      return e.string();
    }
  }
);

const eventSlicer = createSlice({
  name: "event",
  initialState: {
    loading: "idle",
    events: [],
    event: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(fetchEventById.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      const { status } = action.payload;
      if (status === 200) {
        state.loading = "done";
        state.events = action.payload.data;
      } else {
        state.loading = "rejected";
      }
    });

    builder.addCase(fetchEventById.fulfilled, (state, action) => {
      const { status } = action.payload;
      if (status === 200) {
        state.loading = "done";
        state.event = action.payload.data;
      } else {
        state.loading = "rejected";
      }
    });

    builder.addCase(fetchEvents.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(fetchEventById.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export const { setLoading } = eventSlicer.actions;
export default eventSlicer.reducer;
