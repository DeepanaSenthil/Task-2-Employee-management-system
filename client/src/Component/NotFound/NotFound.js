import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[91vh] bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md text-center w-[30%]">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">Oops! Page not found.</p>
        <Link
          to="/"
          className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound