import React from 'react';

interface ProOnlyScreenProps {
  onClose: () => void;
}

const ProOnlyScreen: React.FC<ProOnlyScreenProps> = ({ onClose }) => {
  return (
    <div
      className="h-screen w-screen cursor-pointer flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://video-idea.fra1.cdn.digitaloceanspaces.com/sounds/pro-only.gif')" }}
      onClick={onClose}
      role="button"
      tabIndex={0}
      aria-label="Close pro only screen"
      onKeyPress={(e) => e.key === 'Enter' && onClose()}
    >
      <h1 
        className="text-8xl md:text-9xl font-extrabold text-white uppercase text-center p-4"
        style={{ textShadow: '0 0 10px #000, 0 0 20px #000, 0 0 30px #000, 0 0 40px #ff00de, 0 0 50px #ff00de' }}
      >
        Pros Only!
      </h1>
    </div>
  );
};

export default ProOnlyScreen;
