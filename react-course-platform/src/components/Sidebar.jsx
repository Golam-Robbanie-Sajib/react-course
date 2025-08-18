import React from 'react';
import { NavLink } from 'react-router-dom';
import { courseData } from '../data/courseData';
import { FiX, FiBookOpen } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const getPhaseColor = (phase) => {
    const colors = {
      'JavaScript Fundamentals': 'bg-emerald-500 text-white',
      'Advanced JavaScript': 'bg-orange-500 text-white', 
      'React Fundamentals': 'bg-cyan-500 text-white',
      'Advanced React': 'bg-purple-500 text-white',
      'Production Ready': 'bg-rose-500 text-white'
    };
    return colors[phase] || 'bg-gray-500 text-white';
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-20 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      <aside className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-30 flex flex-col shadow-2xl`}>
        
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center gap-3">
            <FiBookOpen className="text-white" size={24} />
            <h1 className="text-xl font-bold text-white">React Course</h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-white hover:text-gray-200 transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 bg-gray-900">
          <ul className="space-y-2">
            {courseData.map(({ day, title, phase }) => (
              <li key={day}>
                <NavLink
                  to={`/day/${day}`}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `group flex flex-col p-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-105 border-2 border-blue-400' 
                        : 'hover:bg-gray-800 hover:shadow-md hover:scale-102'
                    }`
                  }
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getPhaseColor(phase)}`}>
                      Day {day}
                    </span>
                  </div>
                  <span className="font-medium text-sm text-white leading-tight">
                    {title}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="text-center">
            <p className="text-xs text-gray-300 mb-2">Progress: 0/25 Days</p>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full" style={{width: '0%'}}></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;