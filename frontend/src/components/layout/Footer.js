import React from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full Stack Ocean - Ultimate Daily Timetable &copy; {new Date().getFullYear()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Built with ❤️ using MIT OpenCourseWare content
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/fullstackocean"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5" />
            </a>
            <a
              href="https://ocw.mit.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors flex items-center"
              aria-label="MIT OCW"
            >
              <span className="text-xs">MIT OCW</span>
              <FiExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;