import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { session } from '../../app/_types/types';
import axios from 'axios';
import { ObjectId } from 'bson';
// change name to getSessionListByDate
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

export const getSessionsByTemplateId = createAsyncThunk(
  'sessions/getSessionsByTemplateId',
  async (_id: string) => {
    try {
      const res = await axios.get(
        'http://localhost:3000/api/workout-templates',
        {
          params: {
            _id,
          },
        }
      );
      const result = res.data;
      return result;
    } catch (err) {
      throw err;
    }
  }
);

export const saveSessions = createAsyncThunk(
  'sessions/saveSessions',
  async (sessions: session[]) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/sessions',
        sessions
      );
      return res.data;
    } catch (err) {
      if (err instanceof Error) {
        return console.error({
          error: err.message,
        });
      } else {
        console.error('An unknown error occurred:', err);
      }
    }
  }
);
export const saveSessionsAsTemplate = createAsyncThunk(
  'sessions/saveSessionsAsTemplate',
  async (sessions: session[]) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/workout-templates/sessions',
        sessions
      );
      return res.data;
    } catch (err) {
      if (err instanceof Error) {
        return console.error({
          error: err.message,
        });
      } else {
        console.error('An unknown error occurred:', err);
      }
    }
  }
);

export const deleteSessions = createAsyncThunk(
  'sessions/deleteSessions',
  async (_ids: string[], { rejectWithValue }) => {
    try {
      const results = await Promise.all(
        _ids.map(async (_id) => {
          const req = await axios.delete('http://localhost:3000/api/sessions', {
            params: {
              _id: _id,
            },
          });
          return req.data;
        })
      );
      return results;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? { error: err.message }
          : { error: 'An unknown error occurred' }
      );
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
    builder.addCase(deleteSessions.pending, () => {});
    builder.addCase(deleteSessions.fulfilled, (state, { payload }) => {
      state = state.filter((session) => {
        return !payload.some((p) => p._id === session._id);
      });
      return state;
    });
    builder.addCase(deleteSessions.rejected, (state) => {
      return state;
    });
    builder.addCase(saveSessions.pending, () => {});
    builder.addCase(saveSessions.fulfilled, (state, { payload }) => {
      state = payload.all_data;
      return state;
    });
    builder.addCase(saveSessions.rejected, (state, { payload }) => {});
    builder.addCase(getSessionsByTemplateId.pending, () => {});
    builder.addCase(
      getSessionsByTemplateId.fulfilled,
      (state, action: PayloadAction<session[]>) => {
        const sessions = action.payload.map((p) => {
          return {
            ...p,
            _id: new ObjectId().toString(),
          };
        });
        state.push(...sessions);
      }
    );
    builder.addCase(saveSessionsAsTemplate.pending, () => {});
    builder.addCase(
      saveSessionsAsTemplate.fulfilled,
      (state, { payload }) => {
        state = payload.all_data;
        return state;
      }
    );
  },
});

export const { addSession, markForRemoval, clearAllSessions } =
  accessorySessionSlices.actions;
export default accessorySessionSlices.reducer;
