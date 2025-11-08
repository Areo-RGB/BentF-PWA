import React from 'react';
import { Level } from '../types';
import { LEVELS } from '../constants';

interface LevelSelectionProps {
  onSelectLevel: (level: Level) => void;
  onSelectProLevel: () => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ onSelectLevel, onSelectProLevel }) => {
  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      {LEVELS.map((level, index) => (
        <button
          key={level.id}
          onClick={() => onSelectLevel(level)}
          className={`flex-1 text-4xl md:text-6xl font-bold uppercase tracking-widest transition-all duration-300 ease-in-out
            ${index === 0 ? 'bg-blue-600 text-white hover:bg-blue-500' : ''}
            ${index === 1 ? 'bg-yellow-500 text-black hover:bg-yellow-400' : ''}
            ${index === 2 ? 'bg-red-600 text-white hover:bg-red-500' : ''}
          `}
        >
          {level.name}
        </button>
      ))}
      <button
        onClick={onSelectProLevel}
        className="flex-1 flex flex-col items-center justify-center bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-300"
      >
        <span className="text-4xl md:text-6xl font-bold uppercase tracking-widest">
          Level 4
        </span>
        <span className="text-lg opacity-75 mt-2">
          (Zugang verweigert)
        </span>
      </button>
    </div>
  );
};

export default LevelSelection;