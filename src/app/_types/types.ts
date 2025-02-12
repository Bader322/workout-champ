import { store } from "@/redux/store"

export interface session  {
    _id: string;
    exercise: string;
    weight: number;
    reps: number;
    sets: number;
    volume: number;
}

export type SkillLiftSelection = {
    id: number,
    name: string,
  }

export type RootState = ReturnType<typeof store.getState>;