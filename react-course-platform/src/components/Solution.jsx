import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Solution = ({ solution }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!solution) {
    return null;
  }

  return (
    <div className="border rounded-md mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <span className="font-semibold text-gray-700">
          {isOpen ? 'Hide' : 'Show'} Solution
        </span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      
      {isOpen && (
        <div className="p-4 border-t bg-white">
          <h4 className="font-semibold text-gray-800">Code:</h4>
          <CodeBlock codeString={solution.code} />
          <h4 className="font-semibold text-gray-800 mt-4">Explanation:</h4>
          
          {/* ▼▼▼ THIS IS THE ONLY PART THAT CHANGES ▼▼▼ */}
          <div 
            className="mt-2 text-gray-700 prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: solution.explanation }} 
          />
          {/* ▲▲▲ END OF CHANGE ▲▲▲ */}

        </div>
      )}
    </div>
  );
};

export default Solution;