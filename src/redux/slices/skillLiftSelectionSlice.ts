import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SkillLiftSelection } from "../../app/_types/types";


const initialState : SkillLiftSelection = {
  id: 0,
  name: "Strength Lift (BB)",
};

const skillLiftSelectionSlice = createSlice({
  name: "skillLiftSelection",
  initialState,
  reducers: {
    updateSelection: (state, action: PayloadAction<SkillLiftSelection>) => {
      const { id, name } = action.payload;
      state.id = id;
      state.name = name;
    },
  },
});

export const { updateSelection } = skillLiftSelectionSlice.actions;
export default skillLiftSelectionSlice.reducer;
