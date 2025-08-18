import React from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiTarget, FiTrendingUp, FiBookOpen } from 'react-icons/fi';

const HomePage = () => {
  const phases = [
    { 
      phase: 'JavaScript Fundamentals', 
      days: '1-7', 
      color: 'from-emerald-500 to-teal-500',
      icon: <FiCode className="w-6 h-6" />
    },
    { 
      phase: 'Advanced JavaScript', 
      days: '8-11', 
      color: 'from-orange-500 to-red-500',
      icon: <FiTrendingUp className="w-6 h-6" />
    },
    { 
      phase: 'React Fundamentals', 
      days: '12-16', 
      color: 'from-cyan-500 to-blue-500',
      icon: <FiTarget className="w-6 h-6" />
    },
    { 
      phase: 'Advanced React', 
      days: '17-22', 
      color: 'from-purple-500 to-indigo-500',
      icon: <FiBookOpen className="w-6 h-6" />
    },
    { 
      phase: 'Production Ready', 
      days: '23-25', 
      color: 'from-rose-500 to-pink-500',
      icon: <FiTrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            JavaScript to React
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-slate-700 mb-4">
            25-Day Complete Course
          </p>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform from Python developer to React professional. Structured learning path with hands-on exercises and real-world projects.
          </p>
          
          <Link
            to="/day/1"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            <FiBookOpen className="group-hover:rotate-12 transition-transform" />
            Start Learning Journey
          </Link>
        </div>

        {/* Course Phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {phases.map(({ phase, days, color, icon }) => (
            <div key={phase} className="group">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${color} rounded-xl text-white mb-4 group-hover:rotate-12 transition-transform`}>
                  {icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{phase}</h3>
                <p className="text-sm text-slate-600 font-medium">Days {days}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <h3 className="font-bold text-slate-800 mb-2">🎯 Structured Learning</h3>
            <p className="text-slate-600">Progressive curriculum from basics to production-ready skills</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <h3 className="font-bold text-slate-800 mb-2">💻 Hands-on Exercises</h3>
            <p className="text-slate-600">Practical problems with detailed solutions and explanations</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <h3 className="font-bold text-slate-800 mb-2">🚀 Real Projects</h3>
            <p className="text-slate-600">Build portfolio-worthy applications by course completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;