export type NavTab = 'dashboard' | 'roster' | 'match' | 'training';

export type PositionFilter = 'ALL' | 'SETTERS' | 'HITTERS' | 'LIBEROS';

export interface Player {
  id: string;
  name: string;
  number: string;
  position: 'Outside Hitter' | 'Setter' | 'Middle Blocker' | 'Libero' | 'Right Side Hitter';
  positionCategory: 'SETTERS' | 'HITTERS' | 'LIBEROS';
  killPercent: number;
  statLabel: string;
  statValue: number;
  avatarUrl: string;
  active: boolean;
  height?: string;
  spikeReach?: string;
  blockReach?: string;
  seasonKills?: number;
  seasonAces?: number;
  seasonDigs?: number;
}

export interface MatchScore {
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  setNumber: number;
  setScores: string[]; // e.g. ["25-22", "23-25", "21-19"]
  lastAction: string;
  matchTime: string;
  isLive: boolean;
}

export interface CourtPlayer {
  positionNumber: number; // 1 to 6
  playerId: string;
  name: string;
  playerNumber: string;
  isServer?: boolean;
  isLibero?: boolean;
}

export interface TrainingDrill {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro' | 'All Levels';
  category: 'Technique' | 'Agility' | 'Basics' | 'Strength' | 'Mental';
  typeCategory: 'Drills' | 'Workout Plans' | 'Progress' | 'Favorites';
  imageUrl: string;
  isStarred?: boolean;
  instructions?: string[];
}

export interface TrainingSession {
  id: string;
  session: string;
  focus: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme';
  date: string;
}

export interface SeasonStats {
  acesThisSeason: number;
  killEfficiency: number;
  totalAssists: number;
  mvpWins: number;
  serveAccuracy: number;
  blockEfficiency: number;
  drillsCompletedCount: number;
  targetDrillsCount: number;
  drillsDoneThisWeek: number;
  trainingHours: number;
  streakDays: number;
}
