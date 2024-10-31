export type GameSettings = {
  nBack: number;
  soundEnabled: boolean;
  positionEnabled: boolean;
  roundDuration: number;
  totalRounds: number;
};

export type GameState = {
  currentRound: number;
  sequence: GameStep[];
  isPlaying: boolean;
  isPaused: boolean;
  stats: GameStats;
  streak: number;
};

export type GameStep = {
  position: number;
  sound: string;
  timestamp: number;
  isPositionMatch: boolean;
  isSoundMatch: boolean;
};

export type GameStats = {
  positionStats: MatchStats;
  soundStats: MatchStats;
};

export type MatchStats = {
  correctMatches: number;
  incorrectMatches: number;
  missedMatches: number;
  totalPossibleMatches: number;
  totalAttempts: number;
};

// Using a single voice for consistency
export const SOUNDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Using reliable audio URLs that work in the browser
export const SOUND_URLS: Record<string, string> = {
  'A': 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/a--_us_1.mp3',
  'B': 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/b--_us_1.mp3',
  'C': 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/c--_us_1.mp3',
  'D': 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/d--_us_1.mp3',
  'E': 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/e--_us_1.mp3',
  'F': 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/f--_us_1.mp3',
  'G': 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/g--_us_1.mp3',
  'H': 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/h--_us_1.mp3',
};