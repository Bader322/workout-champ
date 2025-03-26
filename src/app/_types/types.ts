export interface RootState {
  sessions: session[];
  skillLiftSelection?: SkillLiftSelection;
  sessionDate?: string;
  tempChoice: string;
}

export interface session {
  _id: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
  volume: number;
  date: string;
  templateId: string;
  markForRemoval?: boolean;
}

export interface SkillLiftSelection {
  id: number;
  name: string;
}

export interface template {
  _id: string;
  title: string;
  description: string;
  sessions: session[];
}