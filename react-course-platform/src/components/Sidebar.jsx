import React from 'react';
import { NavLink } from 'react-router-dom';
import { courseData } from '../data/courseData';
import { FiX, FiBookOpen } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const getPhaseColor = (phase) => {
    const colors = {
      'JavaScript Fundamentals': 'bg-emerald-400 text-white shadow-emerald-200',
      'Advanced JavaScript': 'bg-orange-400 text-white shadow-orange-200', 
      'React Fundamentals': 'bg-sky-400 text-white shadow-sky-200',
      'Advanced React': 'bg-violet-400 text-white shadow-violet-200',
      'Production Ready': 'bg-rose-400 text-white shadow-rose-200'
    };
    return colors[phase] || 'bg-gray-400 text-white shadow-gray-200';
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 z-20 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      <aside className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-out md:relative md:translate-x-0 z-30 flex flex-col border-r border-gray-100`}>
        
        {/* Header */}
        <div className="p-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FiBookOpen size={24} />
              </div>
              <h1 className="text-2xl font-bold">React Course</h1>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors">
              <FiX size={20} />
            </button>
          </div>
          <p className="text-indigo-100 text-sm font-medium">25-Day Learning Journey</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-4">
          {courseData.map(({ day, title, phase }) => (
            <NavLink
              key={day}
              to={`/day/${day}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `group block p-4 rounded-2xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-102' 
                    : 'hover:bg-gray-50 hover:shadow-md'
                }`
              }
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 text-sm font-bold rounded-full shadow-lg ${getPhaseColor(phase)}`}>
                  {day}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 leading-relaxed">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 font-medium">{phase}</p>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600 font-medium">Your Progress</p>
            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
              <span>0 days</span>
              <span>25 days</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-emerald-400 to-sky-500 h-3 rounded-full transition-all duration-500" style={{width: '0%'}}></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;