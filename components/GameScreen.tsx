import React, { useState, useEffect, useRef } from 'react';
import { Level } from '../types';
import { COLORS, COUNTDOWN_SECONDS } from '../constants';

interface GameScreenProps {
  level: Level;
  onComplete: () => void;
  onRestart: () => void;
}

const notificationSound = new Audio('https://video-idea.fra1.cdn.digitaloceanspaces.com/sounds/beep-short.mp3');

const getRandomColor = (currentColor: string | null): string => {
  let newColor;
  do {
    newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  } while (newColor === currentColor);
  return newColor;
};

const GameScreen: React.FC<GameScreenProps> = ({ level, onComplete, onRestart }) => {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [changesMade, setChangesMade] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const countdownTimer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(countdownTimer);
    }

    // Start game after countdown
    if (countdown === 0 && currentColor === null) {
      notificationSound.play().catch(e => console.error("Error playing sound:", e));
      setCurrentColor(getRandomColor(null));
      setChangesMade(1);
    }
  }, [countdown, currentColor]);

  useEffect(() => {
    if (currentColor === null || changesMade === 0) return;

    if (changesMade > level.changes) {
      onComplete();
      return;
    }

    if (timerRef.current) {
        clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      if (level.soundOnSwitch) {
        notificationSound.play().catch(e => console.error("Error playing sound:", e));
      }
      setCurrentColor(getRandomColor(currentColor));
      setChangesMade(prev => prev + 1);
    }, level.duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changesMade, level, onComplete]);


  return (
    <div className="h-screen w-screen relative">
      {countdown > 0 ? (
        <div className="h-full w-full flex items-center justify-center bg-black text-white text-9xl font-bold">
          {countdown}
        </div>
      ) : (
        <>
          <div className={`h-full w-full transition-colors duration-500 ${currentColor}`}></div>
          {currentColor && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-bold text-white mix-blend-difference z-10 pointer-events-none"
              aria-live="polite"
              aria-label={`Step ${changesMade} of ${level.changes}`}
            >
              {changesMade}/{level.changes}
            </div>
          )}
        </>
      )}
      <button
        onClick={onRestart}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 bg-black bg-opacity-30 text-white text-lg rounded-lg shadow-lg hover:bg-opacity-50 transition-all z-20"
        aria-label="Neustart"
      >
        Neustart
      </button>
    </div>
  );
};

export default GameScreen;