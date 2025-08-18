import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseData } from '../data/courseData';
import NotFoundPage from './NotFoundPage';
import Solution from '../components/Solution';
import { FiClock, FiExternalLink, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const DayPage = () => {
  const { dayId } = useParams();
  const dayData = courseData.find(d => d.day === parseInt(dayId));
  
  if (!dayData) return <NotFoundPage />;
  
  const dayNumber = parseInt(dayId);
  const isFirstDay = dayNumber === 1;
  const isLastDay = dayNumber === courseData.length;

  const getPhaseGradient = (phase) => {
    const gradients = {
      'JavaScript Fundamentals': 'from-emerald-400 to-teal-500',
      'Advanced JavaScript': 'from-orange-400 to-red-500', 
      'React Fundamentals': 'from-sky-400 to-blue-500',
      'Advanced React': 'from-violet-400 to-purple-500',
      'Production Ready': 'from-rose-400 to-pink-500'
    };
    return gradients[phase] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Header */}
      <div className={`bg-gradient-to-r ${getPhaseGradient(dayData.phase)} rounded-3xl p-10 text-white shadow-2xl`}>
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-white/20 px-4 py-2 rounded-full text-lg font-bold backdrop-blur-sm">
              Day {dayData.day}
            </span>
            <span className="flex items-center gap-2 text-white/90">
              <FiClock size={18} />
              {dayData.time || '4 hours'}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {dayData.title}
          </h1>
          <p className="text-xl text-white/90 font-medium">
            {dayData.phase}
          </p>
        </div>
      </div>

      {/* Resources */}
      {dayData.resources && dayData.resources.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              📚
            </span>
            Learning Resources
          </h3>
          <div className="grid gap-4">
            {dayData.resources.map((resource, index) => (
              <a 
                key={index}
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <FiExternalLink className="text-blue-600 group-hover:scale-110 transition-transform" size={20} />
                <span className="text-blue-800 font-semibold text-lg group-hover:text-blue-900">
                  {resource.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Theory Content */}
      <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
        <div 
          className="prose prose-xl prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900" 
          dangerouslySetInnerHTML={{ __html: dayData.theory }} 
        />
      </div>

      {/* Exercises */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-lg">
            ⚡
          </span>
          Practice Exercises
        </h2>
        
        {dayData.exercises.map((ex, index) => (
          <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">{ex.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{ex.description}</p>
                <Solution solution={ex.solution} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-12 border-t-2 border-gray-100">
        {isFirstDay ? (
          <div></div>
        ) : (
          <Link 
            to={`/day/${dayNumber - 1}`} 
            className="flex items-center gap-3 bg-white px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all font-semibold text-gray-700 text-lg"
          >
            <FiArrowLeft size={20} />
            Previous Day
          </Link>
        )}
        
        {!isLastDay && (
          <Link 
            to={`/day/${dayNumber + 1}`} 
            className={`flex items-center gap-3 bg-gradient-to-r ${getPhaseGradient(dayData.phase)} text-white px-8 py-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-all font-semibold text-lg`}
          >
            Next Day
            <FiArrowRight size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default DayPage;