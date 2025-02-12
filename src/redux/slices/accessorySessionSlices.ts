import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { session } from "../../app/_types/types";


const initialState: session[] = [];

const accessorySessionSlices = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<session>) => {
      const { _id, exercise, weight, reps, sets, volume } = action.payload;
      state.push({ _id, exercise, weight, reps, sets, volume });
    },
    deleteSession: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      return state.filter((session: session) => session._id !== _id);
    },
  },
});

export const { addSession, deleteSession } = accessorySessionSlices.actions;
export default accessorySessionSlices.reducer;
