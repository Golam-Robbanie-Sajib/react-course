import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { courseData } from '../data/courseData'

const Sidebar = () => {
  const { dayNumber } = useParams()
  const currentDay = parseInt(dayNumber) || 1

  // Group days by phase
  const phases = courseData.reduce((acc, day) => {
    if (!acc[day.phase]) {
      acc[day.phase] = []
    }
    acc[day.phase].push(day)
    return acc
  }, {})

  const phaseColors = {
    'JavaScript Fundamentals': 'bg-blue-50 border-blue-200 text-blue-800',
    'Advanced JavaScript': 'bg-green-50 border-green-200 text-green-800',
    'React Fundamentals': 'bg-purple-50 border-purple-200 text-purple-800',
    'Advanced React': 'bg-orange-50 border-orange-200 text-orange-800',
    'Production Ready': 'bg-red-50 border-red-200 text-red-800'
  }

  return (
    <aside className="w-80 bg-gray-50 border-r min-h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h2>
        
        <div className="space-y-6">
          {Object.entries(phases).map(([phaseName, days]) => (
            <div key={phaseName}>
              <div className={`px-3 py-2 rounded-lg border ${phaseColors[phaseName]} mb-2`}>
                <h3 className="font-medium text-sm">
                  {phaseName}
                </h3>
                <p className="text-xs opacity-75">
                  Days {days[0].day}-{days[days.length - 1].day}
                </p>
              </div>
              
              <nav className="space-y-1 ml-2">
                {days.map((day) => (
                  <Link
                    key={day.day}
                    to={`/day/${day.day}`}
                    className={`block px-3 py-2 rounded-md text-sm ${
                      currentDay === day.day
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Day {day.day}</span>
                      <span className="text-xs text-gray-500">
                        {day.topics.length} topics
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {day.title}
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
