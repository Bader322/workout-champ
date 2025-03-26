import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { session } from '../../app/_types/types';
import axios from 'axios';
import { useAppDispatch } from '../store';

export const getSessionList = createAsyncThunk(
  'sessions/getSessionList',
  async (date: string) => {
    try {
      const res = await axios.get('http://localhost:3000/api/sessions', {
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

export const saveSessions = createAsyncThunk(
  'sessions/saveSessions',
  async (sessions: session[], { dispatch, rejectWithValue }) => {
    console.log('sessions', sessions);
    const markedForRemoval = sessions
      .map((session) => (session.markForRemoval === true ? session._id : ''))
      .filter((id) => !!id);
      console.log('markedForRemoval', markedForRemoval);
    try {
      Promise.all(markedForRemoval.map(async (m) => await dispatch(deleteSession(m))));
      const res = await axios.post(
        'http://localhost:3000/api/sessions',
        sessions
      );

      return res.data;
    } catch (err) {
      if (err instanceof Error) {
        return console.error({
          error: err.message,
          rejectWithValue: rejectWithValue(err.message),
        });
      } else {
        console.error('An unknown error occurred:', err);
        console.error('An unknown error occurred with rejectWithValue:', err);
      }
    }
  }
);

export const deleteSession = createAsyncThunk(
  'sessions/deleteSession',
  async (_id: string) => {
    try {
      const res = await axios.delete('http://localhost:3000/api/sessions', {
        params: {
          _id: _id,
        },
      });
      console.log('res', res);
      const result = res.data;
      return result;
    } catch (err) {
      if (err instanceof Error) {
        return console.error({ error: err.message });
      } else {
        console.error('An unknown error occurred:', err);
      }
    }
  }
);

const initialState: session[] = [];

const accessorySessionSlices = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<session>) => {
      const {
        _id,
        exercise,
        weight,
        reps,
        sets,
        volume,
        date,
        templateId,
        markForRemoval,
      } = action.payload;
      state.push({
        _id,
        exercise,
        weight,
        reps,
        sets,
        volume,
        date,
        templateId,
        markForRemoval,
      });
    },
    markForRemoval: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      return state.map((session: session) =>
        session._id === _id
          ? { ...session, markForRemoval: !session.markForRemoval }
          : session
      );
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
    builder.addCase(deleteSession.pending, () => {});
    builder.addCase(deleteSession.fulfilled, (state, { payload }) => {
      console.log('deleteSession.fulfilled', payload);
      state = state.filter((session) => session._id !== payload._id);
      return state;
    });
    builder.addCase(saveSessions.pending, () => {});
    builder.addCase(saveSessions.fulfilled, (state, { payload }) => {
      state = payload.all_data;
      return state;
    });
  },
});

export const { addSession, markForRemoval, clearAllSessions } =
  accessorySessionSlices.actions;
export default accessorySessionSlices.reducer;
