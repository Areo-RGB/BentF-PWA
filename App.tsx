import React, { useState, useCallback } from 'react';
import LevelSelection from './components/LevelSelection';
import GameScreen from './components/GameScreen';
import LevelComplete from './components/LevelComplete';
import { Level, GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  const handleSelectLevel = useCallback((level: Level) => {
    setSelectedLevel(level);
    setGameState('playing');
  }, []);

  const handleLevelComplete = useCallback(() => {
    setGameState('complete');
  }, []);

  const handleRestart = useCallback(() => {
    setSelectedLevel(null);
    setGameState('menu');
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case 'menu':
        return <LevelSelection onSelectLevel={handleSelectLevel} />;
      case 'playing':
        if (selectedLevel) {
          return <GameScreen level={selectedLevel} onComplete={handleLevelComplete} onRestart={handleRestart} />;
        }
        // Fallback to menu if level is somehow null
        handleRestart(); 
        return null;
      case 'complete':
        if (selectedLevel) {
          return <LevelComplete level={selectedLevel} onRestart={handleRestart} />;
        }
        // Fallback to menu if level is somehow null
        handleRestart();
        return null;
      default:
        return <LevelSelection onSelectLevel={handleSelectLevel} />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default App;