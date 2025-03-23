import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: string = '';

const workoutTempChoiceSlice = createSlice({
  name: "tempChoice",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      return state = action.payload
    }
  },
});

export const { update } = workoutTempChoiceSlice.actions;
export default workoutTempChoiceSlice.reducer;
