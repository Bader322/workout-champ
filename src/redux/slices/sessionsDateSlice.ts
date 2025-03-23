import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: string = '';

const sessionDateSlice = createSlice({
  name: "sessionDate",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => state = action.payload,
  },
});

export const { update } = sessionDateSlice.actions;
export default sessionDateSlice.reducer;
