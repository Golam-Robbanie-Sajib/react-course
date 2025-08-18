import React from 'react';
import { NavLink } from 'react-router-dom';
import { courseData } from '../data/courseData';
import { FiX, FiBookOpen } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const getPhaseColor = (phase) => {
    const colors = {
      'JavaScript Fundamentals': 'bg-emerald-100 text-emerald-800 border-l-emerald-500',
      'Advanced JavaScript': 'bg-orange-100 text-orange-800 border-l-orange-500', 
      'React Fundamentals': 'bg-cyan-100 text-cyan-800 border-l-cyan-500',
      'Advanced React': 'bg-purple-100 text-purple-800 border-l-purple-500',
      'Production Ready': 'bg-rose-100 text-rose-800 border-l-rose-500'
    };
    return colors[phase] || 'bg-gray-100 text-gray-800 border-l-gray-500';
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-20 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      <aside className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-30 flex flex-col shadow-2xl`}>
        
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-slate-700/50 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center gap-3">
            <FiBookOpen className="text-white/90" size={24} />
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">React Course</h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-white/80 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {courseData.map(({ day, title, phase }) => (
              <li key={day}>
                <NavLink
                  to={`/day/${day}`}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `group flex items-center p-3 my-1 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-[1.02] border border-blue-400/30' 
                        : 'hover:bg-slate-700/50 hover:shadow-md hover:scale-[1.01]'
                    }`
                  }
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-md ${getPhaseColor(phase)} border-l-2`}>
                        Day {day}
                      </span>
                    </div>
                    <span className="font-medium text-sm text-white/90 group-hover:text-white transition-colors leading-tight block mt-1">
                      {title}
                    </span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
          <div className="text-center">
            <p className="text-xs text-slate-400">Progress: 0/25 Days</p>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '0%'}}></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;