import { useState, useEffect } from 'react';
import type { FunctionComponent } from "../common/types";
import { Navigation } from '../components/Navigation';
import { FaTrash } from 'react-icons/fa';

export const Favorites = (): FunctionComponent => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Array<{ quote: string; author: string }>>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (index: number) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <Navigation darkMode={darkMode} />
      
      <div className="pt-20 px-4 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Favorite Quotes</h1>
        
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorite quotes yet. Add some from the home page!</p>
        ) : (
          <div className="grid gap-4">
            {favorites.map((fav, index) => (
              <div key={index} className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-4 rounded-lg relative`}>
                <p className="text-xl mb-2">"{fav.quote}"</p>
                <p className="text-gray-500">- {fav.author}</p>
                <button
                  onClick={() => removeFavorite(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};