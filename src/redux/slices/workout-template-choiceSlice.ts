import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tempChoice } from '@/app/_types/types';

const initialState : tempChoice = {
  _id: '',
  disabledActionBtn: true,
};

const workoutTempChoiceSlice = createSlice({
  name: 'tempChoice',
  initialState,
  reducers: {
    selectTemplate: (state, action: PayloadAction<tempChoice>) => {
      return state = {
       _id: action.payload._id,
        disabledActionBtn: action.payload.disabledActionBtn,
      };
    }
  },
});

export const { selectTemplate } = workoutTempChoiceSlice.actions;
export default workoutTempChoiceSlice.reducer;
