import React, { useEffect } from 'react';
import { Level } from '../types';
import Confetti from './Confetti';

interface LevelCompleteProps {
  level: Level;
  onRestart: () => void;
}

const victorySound = new Audio('https://video-idea.fra1.cdn.digitaloceanspaces.com/sounds/victory-96688.mp3');

const LevelComplete: React.FC<LevelCompleteProps> = ({ level, onRestart }) => {
  useEffect(() => {
    victorySound.play().catch(e => console.error("Error playing victory sound:", e));
  }, []);

  return (
    <>
      <Confetti />
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 text-green-400">
          {level.name} Completed!
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Well done!
        </p>
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-purple-600 text-white font-bold text-2xl rounded-lg shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </>
  );
};

export default LevelComplete;