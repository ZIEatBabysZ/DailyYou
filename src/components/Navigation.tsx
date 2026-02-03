import { Link } from 'react-router-dom';
import { FaHome, FaHeart, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa';
import { useThemeStore } from '../store/themeStore';

export const Navigation = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <nav className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-md z-50`}>
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">DailyYou</div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 hover:text-gray-500" aria-label="Ana Sayfa">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to="/favorites" className="flex items-center space-x-1 hover:text-gray-500" aria-label="Favoriler">
            <FaHeart />
            <span>Favorites</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-1 hover:text-gray-500" aria-label="İletişim">
            <FaEnvelope />
            <span>Contact</span>
          </Link>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};