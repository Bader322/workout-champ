import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postSlice";
import sessionsSlice from "./slices/accessorySessionSlices";
import skillLiftSelectionSlice from './slices/skillLiftSelectionSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    sessions: sessionsSlice,
    skillLiftSelection: skillLiftSelectionSlice,
  },
});
