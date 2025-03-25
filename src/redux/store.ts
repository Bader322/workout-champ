import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import sessionsSlice from './slices/accessorySessionSlices';
import skillLiftSelectionSlice from './slices/skillLiftSelectionSlice';
import sessionDateSlice from './slices/sessionsDateSlice';
import tempChoiceSlice from './slices/workout-template-choiceSlice';

export const store = configureStore({
  reducer: {
    sessions: sessionsSlice,
    skillLiftSelection: skillLiftSelectionSlice,
    sessionDate: sessionDateSlice,
    tempChoice: tempChoiceSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['sessionDate'],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;