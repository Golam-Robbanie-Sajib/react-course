import React from 'react'

const CodeBlock = ({ code, language = 'javascript' }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-sm text-gray-300">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-sm text-gray-300 hover:text-white px-2 py-1 rounded"
        >
          Copy
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono">
          {code}
        </code>
      </pre>
    </div>
  )
}

export default CodeBlock
