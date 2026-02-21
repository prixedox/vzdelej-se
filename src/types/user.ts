export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  subscriptionStatus: string;
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  dailyLessonsUsed: number;
  createdAt: Date;
}

export interface UserStats {
  totalLessons: number;
  totalXp: number;
  averageScore: number;
  totalProblems: number;
  correctAnswers: number;
  currentStreak: number;
  longestStreak: number;
}
