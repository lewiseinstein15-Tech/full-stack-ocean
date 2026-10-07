import React, { useState, useEffect } from 'react';
import { FiBarChart2, FiAward, FiTrendingUp, FiCheckCircle, FiCalendar, FiClock } from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';

const Progress = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const progress = await user?.fetchProgress?.() || null;
      setProgressData(progress);
      setLoading(false);
    };
    
    loadData();
  }, [user]);

  const achievements = [
    { id: 1, name: 'First Lesson', description: 'Complete your first lesson', icon: '🎯', earned: true },
    { id: 2, name: 'Week 1 Complete', description: 'Complete all lessons in Week 1', icon: '📅', earned: false },
    { id: 3, name: 'Python Pro', description: 'Complete all 6.0001 lectures', icon: '🐍', earned: false },
    { id: 4, name: 'Calculus Master', description: 'Complete all 18.01SC lectures', icon: '∫', earned: false },
    { id: 5, name: 'Proof Master', description: 'Complete all 6.042J lectures', icon: '✓', earned: false },
    { id: 6, name: 'Week Streak', description: 'Study for 7 consecutive days', icon: '🔥', earned: user?.progress?.streak >= 7 },
    { id: 7, name: '100 Hours', description: 'Accumulate 100 hours of study', icon: '⏰', earned: (user?.progress?.totalHours || 0) >= 100 },
    { id: 8, name: 'Midterm Survivor', description: 'Take the midterm exam', icon: '📝', earned: false },
  ];

  const courses = [
    { code: '6.0001', name: 'Python Programming', progress: 85, color: 'bg-blue-500' },
    { code: '18.01SC', name: 'Single Variable Calculus', progress: 42, color: 'bg-green-500' },
    { code: '6.042J', name: 'Mathematics for CS', progress: 28, color: 'bg-purple-500' },
  ];

  const history = [
    { date: '2026-10-07', lesson: 'What is Computation?', course: '6.0001', status: 'completed', duration: 90 },
    { date: '2026-10-08', lesson: 'Proofs & Axioms', course: '6.042J', status: 'completed', duration: 90 },
    { date: '2026-10-09', lesson: 'Branching and Iteration', course: '6.0001', status: 'completed', duration: 90 },
    { date: '2026-10-10', lesson: 'Rate of Change', course: '18.01SC', status: 'in-progress', duration: 90 },
    { date: '2026-10-11', lesson: 'Review Day 1', course: 'Review', status: 'pending', duration: 120 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your learning journey and celebrate your achievements
        </p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-4">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {user?.progress?.streak || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-ocean-100 dark:bg-ocean-900/30 rounded-lg mr-4">
              <FiClock className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-ocean-600 dark:text-ocean-400">
                {Math.round(user?.progress?.totalHours || 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours Learned</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
              <FiCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {user?.progress?.completedLessons?.length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lessons Complete</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-4">
              <FiAward className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {user?.progress?.achievements?.length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Earned Badges</div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div>
        <h2 className="text-xl font-bold mb-4">Course Progress</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.code} className="card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{course.code}</span>
                  <span className="text-gray-700 dark:text-gray-300">{course.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${course.color}`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`card text-center ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800'
                  : 'opacity-60'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h3 className="font-bold">{achievement.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {achievement.description}
              </p>
              {achievement.earned && (
                <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                  Earned
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  item.status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : item.status === 'in-progress'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {item.status === 'completed' ? (
                    <FiCheckCircle className="h-5 w-5" />
                  ) : (
                    <FiClock className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{item.lesson}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })} • {item.course} • {item.duration} min
                  </p>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                item.status === 'completed'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : item.status === 'in-progress'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}>
                {item.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;