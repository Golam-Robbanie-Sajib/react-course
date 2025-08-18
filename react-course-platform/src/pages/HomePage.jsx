import React from 'react'
import { Link } from 'react-router-dom'
import { courseData } from '../data/courseData'

const HomePage = () => {
  // Group days by phase
  const phases = courseData.reduce((acc, day) => {
    if (!acc[day.phase]) {
      acc[day.phase] = []
    }
    acc[day.phase].push(day)
    return acc
  }, {})

  const phaseColors = {
    'JavaScript Fundamentals': 'bg-blue-100 text-blue-800',
    'Advanced JavaScript': 'bg-green-100 text-green-800',
    'React Fundamentals': 'bg-purple-100 text-purple-800',
    'Advanced React': 'bg-orange-100 text-orange-800',
    'Production Ready': 'bg-red-100 text-red-800'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          React Course Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Master JavaScript and React in 25 days with hands-on exercises and projects
        </p>
        <Link
          to="/day/1"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium inline-block"
        >
          Start Learning
        </Link>
      </div>

      {/* Course Overview */}
      <div className="mb-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Course Structure
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Phase 1: JavaScript Fundamentals (Days 1-7)
            </h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Variables & Data Types</li>
              <li>• Functions & Scope</li>
              <li>• Objects & Arrays</li>
              <li>• DOM Manipulation</li>
              <li>• Asynchronous JavaScript</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Phase 2: Advanced JavaScript (Days 8-11)
            </h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Closures & Advanced Functions</li>
              <li>• Prototypes & Classes</li>
              <li>• Async/Await & Error Handling</li>
              <li>• Performance Optimization</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Phase 3: React Fundamentals (Days 12-16)
            </h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Components & JSX</li>
              <li>• State & Event Handling</li>
              <li>• Effects & Lifecycle</li>
              <li>• Lists & Forms</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Phase 4: Advanced React (Days 17-22)
            </h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Advanced Hooks</li>
              <li>• Context & Global State</li>
              <li>• Component Patterns</li>
              <li>• React Router & State Libraries</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Phase 5: Production Ready (Days 23-25)
            </h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Testing with Jest & RTL</li>
              <li>• Performance & Build Optimization</li>
              <li>• Final Project Integration</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Days by Phase */}
      {Object.entries(phases).map(([phaseName, days]) => (
        <div key={phaseName} className="mb-10">
          <div className="flex items-center mb-6">
            <span className={`${phaseColors[phaseName]} px-3 py-1 rounded-full text-sm font-medium mr-3`}>
              {phaseName}
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              Days {days[0].day}-{days[days.length - 1].day}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {days.map((day) => (
              <div key={day.day} className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    Day {day.day}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {day.title}
                </h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {day.topics.slice(0, 3).map((topic, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                  {day.topics.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      +{day.topics.length - 3} more
                    </span>
                  )}
                </div>
                <Link
                  to={`/day/${day.day}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Start Lesson →
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default HomePage
