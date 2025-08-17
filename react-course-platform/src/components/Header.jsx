import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMenu } from 'react-icons/fi';

const Header = ({ isHomePage, onMenuClick }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
      <div>
        {!isHomePage && (
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors" aria-label="Home">
            <FiHome size={24} />
          </Link>
        )}
      </div>
      <div className="md:hidden">
        <button onClick={onMenuClick} className="text-gray-600" aria-label="Open sidebar">
          <FiMenu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;