import React from 'react';
import { Outlet } from 'react-router-dom';
import { FiBookOpen } from 'react-icons/fi';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-ocean-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <FiBookOpen className="h-12 w-12 text-primary-600 dark:text-primary-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Full Stack Ocean
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your daily computer science journey
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;