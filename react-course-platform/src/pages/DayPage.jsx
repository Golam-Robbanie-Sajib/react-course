import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { courseData } from '../data/courseData'
import CodeBlock from '../components/CodeBlock'
import Solution from '../components/Solution'

const DayPage = () => {
  const { dayNumber } = useParams()
  const currentDay = parseInt(dayNumber)
  const dayData = courseData.find(day => day.day === currentDay)

  if (!dayData) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Day Not Found</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Return to Home
        </Link>
      </div>
    )
  }

  const prevDay = currentDay > 1 ? currentDay - 1 : null
  const nextDay = currentDay < courseData.length ? currentDay + 1 : null

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Day {dayData.day}
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
              {dayData.phase}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {currentDay} of {courseData.length}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {dayData.title}
        </h1>
        
        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-6">
          {dayData.topics.map((topic, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {/* Theory Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Theory
          </h2>
          <div 
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: dayData.theory }}
          />
        </section>

        {/* Exercises */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Exercises
          </h2>
          {dayData.exercises.map((exercise, index) => (
            <div key={index} className="mb-8 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {exercise.title}
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-gray-800">{exercise.description}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Solution:</h4>
                <CodeBlock code={exercise.solution.code} />
              </div>
              
              {exercise.solution.explanation && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Explanation:</h4>
                  <div 
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: exercise.solution.explanation }}
                  />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Resources */}
        {dayData.resources && dayData.resources.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Additional Resources
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ul className="space-y-2">
                {dayData.resources.map((resource, index) => (
                  <li key={index}>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>

      <div className="flex justify-between items-center mt-12 pt-8 border-t">
        <div>
          {prevDay && (
            <Link
              to={`/day/${prevDay}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              ← Previous Day
            </Link>
          )}
        </div>
        <div>
          {nextDay && (
            <Link
              to={`/day/${nextDay}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Next Day →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default DayPage
