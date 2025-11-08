
export interface Level {
  id: number;
  name: string;
  duration: number; // in milliseconds
  changes: number;
  soundOnSwitch: boolean;
}

export type GameState = 'menu' | 'countdown' | 'playing' | 'complete';
