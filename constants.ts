
import { Level } from './types';

export const COLORS: string[] = ['bg-red-500', 'bg-blue-500', 'bg-white', 'bg-green-500'];
export const COUNTDOWN_SECONDS = 3;

export const LEVELS: Level[] = [
  { id: 1, name: 'Level 1', duration: 5000, changes: 10, soundOnSwitch: true },
  { id: 2, name: 'Level 2', duration: 15000, changes: 10, soundOnSwitch: true },
  { id: 3, name: 'Level 3', duration: 20000, changes: 10, soundOnSwitch: false },
];
