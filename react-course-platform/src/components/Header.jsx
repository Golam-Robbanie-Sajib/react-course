import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiMenu, FiBookOpen } from 'react-icons/fi';

const Header = ({ isHomePage, onMenuClick }) => {
  const location = useLocation();
  const getCurrentDayTitle = () => {
    const match = location.pathname.match(/\/day\/(\d+)/);
    if (match) {
      return `Day ${match[1]}`;
    }
    return 'Home';
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200/50 p-4 flex justify-between items-center z-10">
      <div className="flex items-center gap-4">
        {!isHomePage && (
          <Link 
            to="/" 
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group"
          >
            <div className="p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
              <FiHome size={20} />
            </div>
            <span className="hidden sm:block font-medium">Home</span>
          </Link>
        )}
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <FiBookOpen className="text-slate-400" size={16} />
          <span className="text-slate-600 font-medium">{getCurrentDayTitle()}</span>
        </div>
      </div>

      <div className="md:hidden">
        <button 
          onClick={onMenuClick} 
          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <FiMenu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;