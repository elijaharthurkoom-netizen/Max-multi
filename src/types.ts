export type Operation = 'multiplication' | 'division';

export interface Profile {
  id: string;
  name: string;
  avatarColor: string;
  totalPoints: number;
  streak: number;
  bestStreak: number;
  masteryLevel: number;
}

export interface GameSession {
  id: string;
  profileId: string;
  operation: Operation;
  difficulty: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timestamp: number;
}

export interface MathProblem {
  a: number;
  b: number;
  op: Operation;
  answer: number;
  options: number[];
}

export interface AppState {
  profiles: Profile[];
  currentProfileId: string | null;
  sessions: GameSession[];
}
