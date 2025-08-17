import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseData } from '../data/courseData';
import NotFoundPage from './NotFoundPage';
import Solution from '../components/Solution';

const DayPage = () => {
  const { dayId } = useParams();
  const dayData = courseData.find(d => d.day === parseInt(dayId));
  
  if (!dayData) {
    return <NotFoundPage />;
  }
  
  const dayNumber = parseInt(dayId);
  const isFirstDay = dayNumber === 1;
  const isLastDay = dayNumber === courseData.length;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {`Day ${dayData.day}: ${dayData.title}`}
      </h1>
      <p className="text-md text-gray-500 mb-6 font-semibold italic">
        {`Phase: ${dayData.phase}`}
      </p>

      {/* ▼▼▼ NEW RESOURCES SECTION ▼▼▼ */}
      {dayData.resources && dayData.resources.length > 0 && (
        <div className="mt-6 mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Recommended Resources</h3>
          <ul className="list-disc list-inside space-y-1">
            {dayData.resources.map((resource, index) => (
              <li key={index}>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* ▲▲▲ END OF NEW SECTION ▲▲▲ */}
      
      <div 
        className="prose max-w-none" 
        dangerouslySetInnerHTML={{ __html: dayData.theory }} 
      />

      <h2 className="text-2xl font-bold mt-12 mb-4 border-t pt-6">Exercises</h2>
      <div className="space-y-6">
        {dayData.exercises.map((ex, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-lg">{ex.title}</h3>
            <p className="mt-1 text-gray-700">{ex.description}</p>
            <Solution solution={ex.solution} />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-12 border-t pt-6">
        {isFirstDay ? (
          <div></div>
        ) : (
          <Link 
            to={`/day/${dayNumber - 1}`} 
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            &larr; Previous Day
          </Link>
        )}
        
        {!isLastDay && (
          <Link 
            to={`/day/${dayNumber + 1}`} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Day &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};

export default DayPage;