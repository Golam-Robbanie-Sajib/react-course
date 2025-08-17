import React from 'react';
import { NavLink } from 'react-router-dom';
import { courseData } from '../data/courseData';
import { FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-30 flex flex-col`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h1 className="text-xl font-bold">React Course</h1>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-white" aria-label="Close sidebar">
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          <ul>
            {courseData.map(({ day, title }) => (
              <li key={day}>
                <NavLink
                  to={`/day/${day}`}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center p-2 my-1 rounded transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
                  }
                >
                  {/* We will add progress indicators here later */}
                  <span className="font-medium text-sm">Day {day}: {title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;