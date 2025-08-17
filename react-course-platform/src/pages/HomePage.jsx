import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Complete JavaScript to React - 25 Day Course
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Your comprehensive guide to becoming a production-ready developer.
      </p>
      <Link
        to="/day/1"
        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 inline-block"
      >
        Start Learning
      </Link>
    </div>
  );
};

export default HomePage;