import React, { useState } from 'react';

interface AskDateProps {
  onYes: () => void;
  partnerName: string;
}

const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
  "Plsss? :("
];

const AskDate: React.FC<AskDateProps> = ({ onYes, partnerName }) => {
  const [noCount, setNoCount] = useState(0);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Base font size is 16px (text-base). We multiply to grow the Yes button.
  const yesButtonSize = noCount * 20 + 16; 
  
  // Shrink the No button logic
  const noButtonScale = Math.max(1 - noCount * 0.1, 0.5); // Don't let it disappear completely, just get small
  const noButtonFontSize = Math.max(16 - noCount * 1, 8); // Minimum font size 8px

  // Dynamic image based on "frustration" level
  const getImage = () => {
    if (noCount === 0) return "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
    if (noCount < 3) return "https://media.tenor.com/K6g22Ya81sUAAAAi/bear-please.gif";
    if (noCount < 7) return "https://media.tenor.com/fL0g3f7x8LgAAAAi/bear-cry.gif";
    return "https://media.tenor.com/sqFh8V-q2qgAAAAi/crying-sad.gif";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center selection:bg-rose-200">
      <div className="mb-8 relative w-64 h-64">
        <img
            src={getImage()}
            alt="Cute bear"
            className="w-full h-full object-contain drop-shadow-xl"
        />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-handwriting text-rose-600 font-bold mb-8 animate-bounce-slow">
        Will you go on a date with me, {partnerName}? 🌹
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 z-10"
          style={{ fontSize: yesButtonSize }}
          onClick={onYes}
        >
          Yes
        </button>

        <button
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 z-0"
          style={{ 
            fontSize: noButtonFontSize,
            padding: `${Math.max(8 - noCount, 2)}px ${Math.max(16 - noCount * 2, 4)}px`,
            transform: `scale(${noButtonScale})`
          }}
          onClick={handleNoClick}
        >
          {getNoText()}
        </button>
      </div>
    </div>
  );
};

export default AskDate;