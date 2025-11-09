
import React, { useState, useEffect, useCallback } from 'react';
import { FlashcardData } from './types';
import { ALPHABET_DATA } from './constants';
import { generateImage } from './services/geminiService';
import Flashcard from './components/Flashcard';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [cards, setCards] = useState<FlashcardData[]>(() =>
    ALPHABET_DATA.map(c => ({ ...c, imageUrl: null }))
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndSetImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      for (const cardData of ALPHABET_DATA) {
        const prompt = `A cute cartoon of a ${cardData.wordEnglish}, vibrant anime style, for a children's flashcard, clean background, no words, no letters, textless.`;
        const imageUrl = await generateImage(prompt);

        setCards(prevCards =>
          prevCards.map(c =>
            c.letter === cardData.letter ? { ...c, imageUrl } : c
          )
        );
        
        // Add a delay to stay within API rate limits (e.g., 60 requests per minute)
        await new Promise(resolve => setTimeout(resolve, 1100));
      }
    } catch (err) {
      const errorMessage = 'Failed to generate images. Please ensure your API key is configured correctly and try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 md:p-8" dir="rtl" style={{ fontFamily: '"Rubik", sans-serif' }}>
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-800">לימוד אותיות הא-ב</h1>
        <p className="text-lg text-gray-600 mt-2">כרטיסיות לימוד אינטראקטיביות לילדים</p>
      </header>

      {isLoading && (
        <div className="text-center mb-8">
          <Spinner />
          <p className="text-gray-700">יוצר תמונות קסומות... נא להמתין</p>
        </div>
      )}

      {error && (
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto">
          <strong className="font-bold">שגיאה!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
        {cards.map(card => (
          <Flashcard key={card.letter} card={card} />
        ))}
      </main>
    </div>
  );
};

export default App;