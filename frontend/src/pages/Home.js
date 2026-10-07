import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiPlay, FiTrendingUp, FiCalendar, FiUsers, FiAward } from 'react-icons/fi';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <FiCalendar className="h-8 w-8 text-primary-600" />,
      title: 'Daily Schedule',
      description: 'Follow a structured daily timetable with lectures and practice problems'
    },
    {
      icon: <FiTrendingUp className="h-8 w-8 text-primary-600" />,
      title: 'Progress Tracking',
      description: 'Track your progress, maintain streaks, and earn achievements'
    },
    {
      icon: <FiPlay className="h-8 w-8 text-primary-600" />,
      title: 'MIT OCW Content',
      description: 'All lectures and materials sourced from MIT OpenCourseWare'
    },
    {
      icon: <FiAward className="h-8 w-8 text-primary-600" />,
      title: 'Gamification',
      description: 'Earn badges, maintain streaks, and compete on leaderboards'
    },
  ];

  const courses = [
    {
      code: '6.0001',
      title: 'Introduction to Computer Science and Programming in Python',
      description: 'Programming fundamentals, algorithms, and data structures'
    },
    {
      code: '18.01SC',
      title: 'Single Variable Calculus',
      description: 'Limits, derivatives, integrals, and infinite series'
    },
    {
      code: '6.042J',
      title: 'Mathematics for Computer Science',
      description: 'Mathematical reasoning, discrete structures, and probability'
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="inline-flex items-center justify-center p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
          <span className="text-2xl mr-2">🌊</span>
          <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
            Full Stack Computer Science Curriculum
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-ocean-600 bg-clip-text text-transparent">
          Master Computer Science Daily
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A comprehensive daily study timetable covering Python, Calculus, and Mathematics for Computer Science.
          Based on MIT OpenCourseWare, designed for consistent daily progress.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link
              to="/today"
              className="btn btn-primary"
            >
              <FiCalendar className="mr-2 h-5 w-5" />
              Go to Today's Lessons
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-primary"
              >
                <FiPlay className="mr-2 h-5 w-5" />
                Start Learning
              </Link>
              <Link
                to="/courses"
                className="btn btn-outline"
              >
                <FiAward className="mr-2 h-5 w-5" />
                Browse Courses
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Everything You Need to Succeed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Current Courses (Term 1)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.code}
              to={`/courses/${course.code}`}
              className="card hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {course.code}
                </span>
                <FiPlay className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {course.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* User Progress Preview */}
      {user && (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Progress</h2>
            <Link
              to="/progress"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
            >
              View Details
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {user.progress?.streak || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Day Streak
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ocean-600 dark:text-ocean-400">
                {Math.round(user.progress?.totalHours || 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Hours Learned
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">
                {user.progress?.completedLessons?.length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Lessons Complete
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!user && (
        <section className="text-center py-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of learners mastering computer science daily with MIT OCW content.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <FiUsers className="mr-2 h-5 w-5" />
            Create Free Account
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;