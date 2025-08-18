import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseData } from '../data/courseData';
import NotFoundPage from './NotFoundPage';
import Solution from '../components/Solution';
import { FiClock, FiBookOpen, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const DayPage = () => {
  const { dayId } = useParams();
  const dayData = courseData.find(d => d.day === parseInt(dayId));
  
  if (!dayData) {
    return <NotFoundPage />;
  }
  
  const dayNumber = parseInt(dayId);
  const isFirstDay = dayNumber === 1;
  const isLastDay = dayNumber === courseData.length;

  const getPhaseColor = (phase) => {
    const colors = {
      'JavaScript Fundamentals': 'from-emerald-500 to-teal-600',
      'Advanced JavaScript': 'from-orange-500 to-red-600', 
      'React Fundamentals': 'from-cyan-500 to-blue-600',
      'Advanced React': 'from-purple-500 to-indigo-600',
      'Production Ready': 'from-rose-500 to-pink-600'
    };
    return colors[phase] || 'from-gray-500 to-gray-600';
  };

  const getPhaseBadgeColor = (phase) => {
    const colors = {
      'JavaScript Fundamentals': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Advanced JavaScript': 'bg-orange-100 text-orange-800 border-orange-300', 
      'React Fundamentals': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'Advanced React': 'bg-purple-100 text-purple-800 border-purple-300',
      'Production Ready': 'bg-rose-100 text-rose-800 border-rose-300'
    };
    return colors[phase] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className={`bg-gradient-to-r ${getPhaseColor(dayData.phase)} rounded-2xl p-8 mb-8 text-white shadow-2xl`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-4 py-2 text-sm font-bold rounded-full ${getPhaseBadgeColor(dayData.phase)} border-2`}>
                Day {dayData.day}
              </span>
              <span className="flex items-center gap-1 text-white/90 text-sm">
                <FiClock size={16} />
                {dayData.time || '4 hours'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {dayData.title}
            </h1>
            <p className="text-lg text-white/90 font-medium">
              {dayData.phase}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FiBookOpen className="text-white/80" size={24} />
          </div>
        </div>
      </div>

      {/* Resources Section */}
      {dayData.resources && dayData.resources.length > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <FiBookOpen className="text-blue-600" />
            Recommended Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dayData.resources.map((resource, index) => (
              <a 
                key={index}
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></span>
                <span className="text-blue-700 hover:text-blue-900 font-medium">
                  {resource.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Theory Section */}
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800" 
          dangerouslySetInnerHTML={{ __html: dayData.theory }} 
        />
      </div>

      {/* Exercises Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            ⚡
          </span>
          Practice Exercises
        </h2>
        <div className="space-y-6">
          {dayData.exercises.map((ex, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{ex.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{ex.description}</p>
                  <Solution solution={ex.solution} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-8 border-t-2 border-gray-200">
        {isFirstDay ? (
          <div></div>
        ) : (
          <Link 
            to={`/day/${dayNumber - 1}`} 
            className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
          >
            <FiArrowLeft size={18} />
            Previous Day
          </Link>
        )}
        
        {!isLastDay && (
          <Link 
            to={`/day/${dayNumber + 1}`} 
            className={`flex items-center gap-2 bg-gradient-to-r ${getPhaseColor(dayData.phase)} text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg font-medium`}
          >
            Next Day
            <FiArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default DayPage;