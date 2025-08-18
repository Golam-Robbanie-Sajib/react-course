import React, { useState } from 'react'
import CodeBlock from './CodeBlock'

const Solution = ({ solution }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
      >
        {isVisible ? 'Hide Solution' : 'Show Solution'}
      </button>
      
      {isVisible && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Solution:</h4>
          <CodeBlock code={solution} />
        </div>
      )}
    </div>
  )
}

export default Solution
