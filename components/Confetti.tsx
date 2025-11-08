
import React from 'react';

const CONFETTI_COUNT = 150;
const CONFETTI_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#8b5cf6', '#ec4899'];

const ConfettiPiece: React.FC<{ index: number }> = ({ index }) => {
  const style: React.CSSProperties = {
    position: 'fixed',
    width: `${Math.random() * 8 + 6}px`,
    height: `${Math.random() * 8 + 6}px`,
    backgroundColor: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    top: '-20px',
    left: `${Math.random() * 100}%`,
    opacity: 1,
    transform: `rotate(${Math.random() * 360}deg)`,
    animation: `fall ${Math.random() * 3 + 4}s linear ${Math.random() * 5}s infinite`,
  };

  return <div style={style} />;
};

const Confetti: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `}</style>
      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  );
};

export default Confetti;
