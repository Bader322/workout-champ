import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { session } from "../../app/_types/types";
import axios from "axios";

export const getSessionList = createAsyncThunk(
  "sessions/getSessionList",
  async (date: string) => {
    try {
      const res = await axios.get("http://localhost:3000/api/sessions", {
        params: {
          date,
        },
      });
      const result = res.data;
      return result;
    } catch (err) {
      throw err;
    }
  }
);

const initialState: session[] = [];

const accessorySessionSlices = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<session>) => {
      const { _id, exercise, weight, reps, sets, volume, date, templateId } =
        action.payload;
      state.push({ _id, exercise, weight, reps, sets, volume, date, templateId });
    },
    deleteSession: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      return state.filter((session: session) => session._id !== _id);
    },
    clearAllSessions: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSessionList.pending, () => {});
    builder.addCase(getSessionList.fulfilled, (state, { payload }) => {
      state.push(...payload);
    });
  },
});

export const { addSession, deleteSession, clearAllSessions } =
  accessorySessionSlices.actions;
export default accessorySessionSlices.reducer;
