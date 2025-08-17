import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl">Page Not Found</p>
      <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
