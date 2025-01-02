import { Link } from 'react-router-dom';
import { FaHome, FaHeart, FaEnvelope } from 'react-icons/fa';

export const Navigation = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-md`}>
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">DailyYou</div>
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center space-x-1 hover:text-gray-500">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to="/favorites" className="flex items-center space-x-1 hover:text-gray-500">
            <FaHeart />
            <span>Favorites</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-1 hover:text-gray-500">
            <FaEnvelope />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}; 