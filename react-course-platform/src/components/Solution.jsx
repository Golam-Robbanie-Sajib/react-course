import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import { FiChevronDown, FiChevronUp, FiCode, FiMessageCircle } from 'react-icons/fi';

const Solution = ({ solution }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!solution) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-2xl border-2 border-indigo-200 transition-all duration-200 group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiCode className="text-white" size={20} />
          </div>
          <span className="font-bold text-gray-800 text-lg">
            {isOpen ? 'Hide Solution' : 'View Solution'}
          </span>
        </div>
        <div className="text-indigo-600 group-hover:scale-110 transition-transform">
          {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
        </div>
      </button>
      
      {isOpen && (
        <div className="mt-4 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Code Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <FiCode className="text-white" size={16} />
              </div>
              <h4 className="font-bold text-xl text-gray-800">Code Solution</h4>
            </div>
            <CodeBlock codeString={solution.code} />
          </div>

          {/* Explanation Section */}
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FiMessageCircle className="text-white" size={16} />
              </div>
              <h4 className="font-bold text-xl text-gray-800">How It Works</h4>
            </div>
            <div 
              className="prose prose-lg prose-blue max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-blue-800 prose-code:text-purple-600 prose-code:bg-purple-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-md" 
              dangerouslySetInnerHTML={{ __html: solution.explanation }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Solution;