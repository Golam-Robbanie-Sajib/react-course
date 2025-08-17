import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CodeBlock = ({ codeString }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative group my-4">
      <SyntaxHighlighter 
        language="javascript" 
        style={atomDark} 
        customStyle={{ borderRadius: '0.5rem', padding: '1rem' }}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-700 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
        aria-label="Copy code to clipboard"
      >
        {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
      </button>
    </div>
  );
};

export default CodeBlock;
