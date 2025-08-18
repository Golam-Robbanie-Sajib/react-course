import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import { FiChevronDown, FiChevronUp, FiCode, FiMessageCircle } from 'react-icons/fi';

const Solution = ({ solution }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!solution) {
    return null;
  }

  return (
    <div className="border-2 border-gradient-to-r from-purple-200 to-pink-200 rounded-xl mt-4 overflow-hidden shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <FiCode className="text-white" size={16} />
          </div>
          <span className="font-bold text-gray-800">
            {isOpen ? 'Hide' : 'Show'} Solution
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-600 font-medium">
            {isOpen ? 'Collapse' : 'Expand'}
          </span>
          {isOpen ? <FiChevronUp className="text-purple-600" /> : <FiChevronDown className="text-purple-600" />}
        </div>
      </button>
      
      {isOpen && (
        <div className="bg-white border-t-2 border-purple-200">
          {/* Code Section */}
          <div className="p-6 border-b border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              <FiCode className="text-purple-600" />
              Code Solution
            </h4>
            <CodeBlock codeString={solution.code} />
          </div>

          {/* Explanation Section */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              <FiMessageCircle className="text-blue-600" />
              Explanation
            </h4>
            <div 
              className="prose prose-blue max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-blue-800 prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-2 prose-code:py-1 prose-code:rounded" 
              dangerouslySetInnerHTML={{ __html: solution.explanation }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Solution;