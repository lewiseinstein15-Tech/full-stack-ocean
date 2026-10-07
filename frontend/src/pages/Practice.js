import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiPlay, FiFileText, FiCheckCircle, FiClock, FiCode, FiUsers } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Practice = () => {
  const { checkLessonCompleted, completeLesson } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const practiceProblems = [
    {
      id: 'pset0',
      title: 'Python Setup and Problem Set 0',
      description: 'Install Python, configure environment, and complete introductory exercises',
      course: '6.0001',
      courseName: 'Introduction to Computer Science and Programming in Python',
      difficulty: 'Beginner',
      estimatedTime: '2-3 hours',
      type: 'assignment',
      link: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
      tags: ['Python', 'Setup', 'Introductory'],
      dueDate: '2026-10-07',
      daysRemaining: 0,
    },
    {
      id: 'pset1',
      title: 'Problem Set 1 - Branching, Iteration, and String Manipulation',
      description: 'Implement basic algorithms using conditionals, loops, and string operations',
      course: '6.0001',
      courseName: 'Introduction to Computer Science and Programming in Python',
      difficulty: 'Beginner',
      estimatedTime: '3-4 hours',
      type: 'assignment',
      link: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
      tags: ['Python', 'Loops', 'Strings'],
      dueDate: '2026-10-14',
      daysRemaining: -7,
    },
    {
      id: 'calculus-pset1',
      title: 'Calculus Problem Set 1 - Differentiation',
      description: 'Practice derivative rules including power rule, product rule, and chain rule',
      course: '18.01SC',
      courseName: 'Single Variable Calculus',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 hours',
      type: 'assignment',
      link: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/assignments/',
      tags: ['Derivatives', 'Calculus', 'Problem Set'],
      dueDate: '2026-10-15',
      daysRemaining: -8,
    },
    {
      id: 'proof-problems',
      title: 'Proof Exercises - Connectives and Axioms',
      description: 'Practice mathematical proofs using logical connectives and axiomatic reasoning',
      course: '6.042J',
      courseName: 'Mathematics for Computer Science',
      difficulty: 'Intermediate',
      estimatedTime: '2-3 hours',
      type: 'problem-set',
      link: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/assignments/',
      tags: ['Proofs', 'Logic', 'Foundations'],
      dueDate: '2026-10-12',
      daysRemaining: -5,
    },
    {
      id: 'induction-problems',
      title: 'Induction Practice Problems',
      description: 'Work through problems requiring mathematical induction techniques',
      course: '6.042J',
      courseName: 'Mathematics for Computer Science',
      difficulty: 'Intermediate',
      estimatedTime: '3-4 hours',
      type: 'problem-set',
      link: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/assignments/',
      tags: ['Induction', 'Proofs', 'Number Theory'],
      dueDate: '2026-10-16',
      daysRemaining: -9,
    },
    {
      id: 'rsa-problems',
      title: 'RSA Encryption and Number Theory Problems',
      description: 'Apply modular arithmetic to RSA encryption and decryption exercises',
      course: '6.042J',
      courseName: 'Mathematics for Computer Science',
      difficulty: 'Advanced',
      estimatedTime: '4-5 hours',
      type: 'problem-set',
      link: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/exams/',
      tags: ['RSA', 'Cryptography', 'Number Theory', 'Modular Arithmetic'],
      dueDate: '2026-11-17',
      daysRemaining: 17,
    },
    {
      id: 'midterm-practice',
      title: 'Midterm Practice Exams',
      description: 'Complete past midterm exams under timed conditions',
      course: 'MULTI',
      courseName: 'All Courses (Midterm Prep)',
      difficulty: 'Advanced',
      estimatedTime: '6+ hours',
      type: 'exam',
      link: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/exams/',
      tags: ['Exam', 'Midterm', 'Practice', 'Comprehensive'],
      dueDate: '2026-11-22',
      daysRemaining: 22,
    },
    {
      id: 'pset2',
      title: 'Problem Set 2 - Lists, Recursion, and Dictionaries',
      description: 'Implement recursive solutions and work with list and dictionary data structures',
      course: '6.0001',
      courseName: 'Introduction to Computer Science and Programming in Python',
      difficulty: 'Intermediate',
      estimatedTime: '3-4 hours',
      type: 'assignment',
      link: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
      tags: ['Python', 'Recursion', 'Lists', 'Dictionaries'],
      dueDate: '2026-10-21',
      daysRemaining: -14,
    },
    {
      id: 'pset3',
      title: 'Problem Set 3 - Object-Oriented Programming',
      description: 'Design classes, implement inheritance, and practice OOP principles',
      course: '6.0001',
      courseName: 'Introduction to Computer Science and Programming in Python',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 hours',
      type: 'assignment',
      link: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
      tags: ['Python', 'OOP', 'Classes', 'Inheritance'],
      dueDate: '2026-10-28',
      daysRemaining: -21,
    },
    {
      id: 'pset4',
      title: 'Problem Set 4 - Program Efficiency',
      description: 'Analyze algorithmic complexity, implement efficient algorithms',
      course: '6.0001',
      courseName: 'Introduction to Computer Science and Programming in Python',
      difficulty: 'Advanced',
      estimatedTime: '4-5 hours',
      type: 'assignment',
      link: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
      tags: ['Algorithms', 'Complexity', 'Big-O', 'Efficiency'],
      dueDate: '2026-11-04',
      daysRemaining: -28,
    },
    {
      id: 'pset5',
      title: 'Problem Set 5 - Searching and Sorting',
      description: 'Implement and analyze search and sort algorithms',
      course: '6.0001',
      courseName: 'Introduction to Computer Science and Programming in Python',
      difficulty: 'Advanced',
      estimatedTime: '4-5 hours',
      type: 'assignment',
      link: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
      tags: ['Searching', 'Sorting', 'Algorithms'],
      dueDate: '2026-11-14',
      daysRemaining: -38,
    },
  ];

  useEffect(() => {
    const loadCompletionStatus = async () => {
      setLoading(true);
      const statusSet = new Set();
      for (const problem of practiceProblems) {
        const completed = await checkLessonCompleted(problem.id);
        if (completed) statusSet.add(problem.id);
      }
      setCompletedLessons(statusSet);
      setLoading(false);
    };

    loadCompletionStatus();
  }, [checkLessonCompleted]);

  const filters = [
    { id: 'all', label: 'All Problems', icon: '📚' },
    { id: 'assignment', label: 'Assignments', icon: '📝' },
    { id: 'problem-set', label: 'Problem Sets', icon: '🧩' },
    { id: 'exam', label: 'Exams', icon: '📋' },
    { id: 'completed', label: 'Completed', icon: '✅' },
  ];

  const difficultyColors = {
    'Beginner': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    'Intermediate': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    'Advanced': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
  };

  const courseColors = {
    '6.0001': 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    '18.01SC': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    '6.042J': 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    'MULTI': 'bg-ocean-50 dark:bg-ocean-900/20 border-ocean-200 dark:border-ocean-800',
  };

  const filteredProblems = practiceProblems.filter(problem => {
    const matchesSearch = 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      problem.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'completed' && completedLessons.has(problem.id)) ||
      (activeFilter === problem.type) ||
      (activeFilter !== 'all' && activeFilter !== 'completed' && problem.type === activeFilter);
    
    return matchesSearch && matchesFilter;
  });

  const handleToggleComplete = async (problemId) => {
    const wasCompleted = completedLessons.has(problemId);
    
    if (wasCompleted) {
      completedLessons.delete(problemId);
    } else {
      await completeLesson(problemId, 2);
      completedLessons.add(problemId);
    }
    
    setCompletedLessons(new Set(completedLessons));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete assignments and practice problems to reinforce your learning
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search problems by course, topic, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredProblems.length} {filteredProblems.length === 1 ? 'problem' : 'problems'}
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredProblems.map((problem) => {
          const isCompleted = completedLessons.has(problem.id);

          return (
            <div
              key={problem.id}
              className={`card ${courseColors[problem.course] || courseColors.MULTI} ${
                isCompleted ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      problem.course === '6.0001' 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        : problem.course === '18.01SC'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                    }`}>
                      {problem.course}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[problem.difficulty]}`}>
                      {problem.difficulty}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {problem.type}
                    </span>
                  </div>

                  <h3 className={`font-bold text-lg mb-1 ${isCompleted ? 'line-through' : ''}`}>
                    {problem.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {problem.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {problem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <FiClock className="h-4 w-4 mr-1" />
                      {problem.estimatedTime}
                    </div>
                    {problem.dueDate && (
                      <div className="flex items-center">
                        <FiCalendar className="h-4 w-4 mr-1" />
                        Due: {new Date(problem.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex gap-4">
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      <FiPlay className="mr-1 h-4 w-4" />
                      {problem.type === 'exam' ? 'View Exam' : 'View Problems'}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleComplete(problem.id)}
                  className={`ml-4 p-2 rounded-full transition-all ${
                    isCompleted
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 scale-110'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                  }`}
                  title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  <FiCheckCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProblems.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No problems found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Practice;