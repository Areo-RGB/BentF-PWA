import React, { useState, useCallback, useEffect } from 'react';
import LevelSelection from './components/LevelSelection';
import GameScreen from './components/GameScreen';
import LevelComplete from './components/LevelComplete';
import { Level, GameState } from './types';

// The type for BeforeInstallPromptEvent is not standard in TS yet, so we define a basic interface for it.
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}


const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Don't show the prompt if the app is already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return;
      }
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPromptEvent) {
      return;
    }
    // Show the install prompt
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await installPromptEvent.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // We can't use the prompt again, clear it
    setInstallPromptEvent(null);
  };

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
      {installPromptEvent && gameState === 'menu' && (
        <button
          onClick={handleInstallClick}
          className="absolute top-4 right-4 z-50 flex items-center px-4 py-2 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105"
          aria-label="App installieren"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Installieren
        </button>
      )}
    </div>
  );
};

export default App;
