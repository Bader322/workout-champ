import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { template } from '@/app/_types/types';
import axios from 'axios';

const initialState: template[] = [];

export const getTemplates = createAsyncThunk(
  'templates/getTemplates',
  async () => {
    try {
      const res = await axios.get(
        'http://localhost:3000/api/workout-templates'
      );
      const result = res.data;
      return result;
    } catch (err) {
      throw err;
    }
  }
);

const workoutTempSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    clearTemplates: () => []
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplates.pending, () => {});
    builder.addCase(getTemplates.fulfilled, (state, { payload }) => {
      state.push(...payload);
    });
  },
});

export const { clearTemplates } = workoutTempSlice.actions;
export default workoutTempSlice.reducer;
