import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiClock, FiUsers, FiAward } from 'react-icons/fi';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const courses = [
    {
      code: '6.0001',
      title: 'Introduction to Computer Science and Programming in Python',
      description: 'Programming fundamentals, algorithms, data structures, and computational problem-solving',
      instructor: 'Prof. John Guttag',
      term: 'TERM1',
      hours: 12,
      students: 1243,
      level: 'Beginner',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      code: '18.01SC',
      title: 'Single Variable Calculus',
      description: 'Limits, derivatives, integrals, infinite series, and their applications',
      instructor: 'Prof. David Jerison',
      term: 'TERM1',
      hours: 18,
      students: 982,
      level: 'Beginner',
      color: 'from-green-500 to-teal-500'
    },
    {
      code: '6.042J',
      title: 'Mathematics for Computer Science',
      description: 'Mathematical reasoning, discrete structures, probability, induction, and number theory',
      instructor: 'Prof. Tom Leighton',
      term: 'TERM1',
      hours: 15,
      students: 856,
      level: 'Intermediate',
      color: 'from-purple-500 to-violet-500'
    },
    {
      code: 'CS50x',
      title: 'Computer Science 50',
      description: 'Harvard\'s introductory computer science course covering C, Python, SQL, and web development',
      instructor: 'Prof. David Malan',
      term: 'TERM2',
      hours: 20,
      students: 2100,
      level: 'Beginner',
      color: 'from-yellow-500 to-amber-500',
      comingSoon: true
    },
    {
      code: '6.006',
      title: 'Introduction to Algorithms',
      description: 'Design and analysis of algorithms, data structures, sorting, and searching',
      instructor: 'Prof. Erik Demaine',
      term: 'TERM4',
      hours: 18,
      students: 745,
      level: 'Intermediate',
      color: 'from-red-500 to-rose-500',
      comingSoon: true
    },
    {
      code: '6.828',
      title: 'Operating System Engineering',
      description: 'Operating system design, including virtual memory, threads, and distributed systems',
      instructor: 'Prof. Frans Kaashoek',
      term: 'TERM5',
      hours: 20,
      students: 456,
      level: 'Advanced',
      color: 'from-indigo-500 to-blue-500',
      comingSoon: true
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                          (filter === 'current' && !course.comingSoon) ||
                          (filter === 'coming' && course.comingSoon) ||
                          (filter === course.level.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Courses & Curriculum</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore all courses in the Full Stack Ocean curriculum
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'current', 'coming'].map((filterKey) => (
            <button
              key={filterKey}
              onClick={() => setFilter(filterKey)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === filterKey
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filterKey === 'all' ? 'All Courses' : 
               filterKey === 'current' ? 'Current Term' : 'Coming Soon'}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.code}
            to={`/courses/${course.code}`}
            className="group"
          >
            <div className="card h-full transition-transform duration-200 group-hover:transform group-hover:-translate-y-1">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {course.code}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium status-badge ${
                  course.comingSoon
                    ? 'status-review'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                }`}>
                  {course.comingSoon ? 'Coming Soon' : 'Active'}
                </span>
              </div>
              
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {course.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {course.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiClock className="h-4 w-4 mr-2" />
                  <span>{course.hours}h/week</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{course.level}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiUsers className="h-4 w-4 mr-2" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiAward className="h-4 w-4 mr-2" />
                  <span>{course.instructor}</span>
                </div>
              </div>
              
              <div className={`mt-4 h-2 rounded-full bg-gradient-to-r ${course.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;