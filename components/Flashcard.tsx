
import React from 'react';
import { FlashcardData } from '../types';

interface FlashcardProps {
  card: FlashcardData;
}

const Flashcard: React.FC<FlashcardProps> = ({ card }) => {
  const borderColor = card.color === 'red' ? 'border-red-400' : 'border-blue-800';

  return (
    <div className={`
      w-full aspect-[3/4]
      border-8 ${borderColor} rounded-2xl shadow-lg
      bg-white p-4 flex flex-col justify-between
      transition-transform duration-300 hover:scale-105 hover:shadow-2xl
      overflow-hidden
    `}>
      <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_calc(1.75rem-1px),#dbeafe_calc(1.75rem-1px),#dbeafe_1.75rem)] bg-clip-content">
        <div className="flex-grow flex items-center justify-center">
            <span className="text-black font-bold text-[12rem] leading-none select-none" style={{ fontFamily: '"Rubik", sans-serif' }}>
              {card.letter}
            </span>
        </div>
        
        <div className="flex justify-between items-end h-1/3">
          <div className="flex items-end">
             <span className="text-black font-bold text-6xl select-none" style={{ fontFamily: '"Rubik", sans-serif' }}>{card.letter}</span>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center">
            {card.imageUrl ? (
              <img src={card.imageUrl} alt={card.wordEnglish} className="max-w-full max-h-full object-contain drop-shadow-lg" />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;