export const NO_TEMPLATE_SESSION = '67ddeb18a32e9ac6df434f11';

export interface RootState {
  sessions: session[];
  skillLiftSelection?: SkillLiftSelection;
  sessionDate?: string;
  tempChoice: tempChoice;
}

export interface session {
  _id: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
  volume: number;
  date: string;
  templateId?: string;
  markForRemoval?: boolean;
  err?: string
  
}

export interface SkillLiftSelection {
  id: number;
  name: string;
}

export interface template {
  _id: string;
  title: string;
  description: string;
  sessions: string[];
}

export interface tempChoice {
  _id: string;
  disabledActionBtn: boolean;
}