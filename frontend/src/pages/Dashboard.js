import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiCheck, FiPlay, FiFileText, FiAward, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';

const Dashboard = () => {
  const { user, fetchToday, completeLesson, checkLessonCompleted } = useAuth();
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonStatus, setLessonStatus] = useState({});

  useEffect(() => {
    const loadToday = async () => {
      setLoading(true);
      const data = await fetchToday();
      setToday(data);
      
      // Check completion status for all lessons
      if (data?.lessons) {
        const status = {};
        for (const lesson of data.lessons) {
          if (lesson.lectureLink) {
            status[lesson._id || lesson.id] = await checkLessonCompleted(lesson._id || lesson.id);
          }
        }
        setLessonStatus(status);
      }
      setLoading(false);
    };
    
    loadToday();
  }, [fetchToday, checkLessonCompleted]);

  const handleCompleteLesson = async (lessonId, hours) => {
    await completeLesson(lessonId, hours);
    setLessonStatus(prev => ({ ...prev, [lessonId]: true }));
  };

  const handleUncompleteLesson = async (lessonId, hours) => {
    // For simplicity, we'll just toggle the UI state
    // In a full implementation, this would call the API
    setLessonStatus(prev => ({ ...prev, [lessonId]: false }));
  };

  const getDayLabel = (date) => {
    const d = new Date(date);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'EEEE, MMMM d');
  };

  const getCourseColor = (courseCode) => {
    const colors = {
      '6.0001': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      '18.01SC': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      '6.042J': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    };
    return colors[courseCode] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.firstName || user?.username}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Your computer science learning journey
          </p>
        </div>
        <Link to="/today" className="btn btn-primary">
          <FiCalendar className="mr-2 h-4 w-4" />
          View Today
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-4">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
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
              <div className="text-2xl font-bold text-ocean-600 dark:text-ocean-400">
                {Math.round(user?.progress?.totalHours || 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours Learned</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <FiCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
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
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {user?.progress?.achievements?.length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Achievements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div>
        <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : today?.upcoming ? (
          <div className="card">
            <p className="text-gray-600 dark:text-gray-400">
              No lessons scheduled for today. 
              {today && (
                <span> Next lesson: <strong>{getDayLabel(today.date)}</strong></span>
              )}
            </p>
          </div>
        ) : today ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{getDayLabel(today.date)}</h3>
              {today.isReviewDay && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  Review Day
                </span>
              )}
            </div>

            {today.isReviewDay ? (
              <div className="card bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Review Notes</h4>
                <p className="text-gray-700 dark:text-gray-300">{today.reviewNotes}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {today.lessons.map((lesson, idx) => (
                  <div key={lesson._id || idx} className="card">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCourseColor(lesson.metadata?.course)}`}>
                            {lesson.metadata?.course || 'Course'}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            <FiClock className="inline h-4 w-4 mr-1" />
                            {lesson.duration} min
                          </span>
                        </div>
                        <h4 className="font-bold text-lg mb-1">{lesson.title}</h4>
                        {lesson.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {lesson.description}
                          </p>
                        )}
                        
                        {lesson.lectureLink && (
                          <a
                            href={lesson.lectureLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mr-4"
                          >
                            <FiPlay className="mr-1 h-4 w-4" />
                            Watch Lecture
                          </a>
                        )}
                        {lesson.practiceLink && (
                          <a
                            href={lesson.practiceLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300"
                          >
                            <FiFileText className="mr-1 h-4 w-4" />
                            Practice Problems
                          </a>
                        )}
                      </div>

                      {/* Completion Checkbox */}
                      <div className="ml-4">
                        <button
                          onClick={() => {
                            if (lessonStatus[lesson._id || lesson.id]) {
                              handleUncompleteLesson(lesson._id || lesson.id, lesson.duration / 60 || 1.5);
                            } else {
                              handleCompleteLesson(lesson._id || lesson.id, lesson.duration / 60 || 1.5);
                            }
                          }}
                          className={`p-2 rounded-full transition-all ${
                            lessonStatus[lesson._id || lesson.id]
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                          }`}
                          title={lessonStatus[lesson._id || lesson.id] ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          <FiCheck className={`h-5 w-5 ${lessonStatus[lesson._id || lesson.id] ? 'text-green-600 dark:text-green-400' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="card">
            <p className="text-gray-600 dark:text-gray-400">No lessons available for today.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/courses"
            className="card text-center hover:shadow-md transition-shadow"
          >
            <FiPlay className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
            <h3 className="font-semibold">Browse Courses</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Explore all available courses
            </p>
          </Link>
          
          <Link
            to="/progress"
            className="card text-center hover:shadow-md transition-shadow"
          >
            <FiTrendingUp className="h-8 w-8 text-ocean-600 dark:text-ocean-400 mx-auto mb-2" />
            <h3 className="font-semibold">My Progress</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Track your learning journey
            </p>
          </Link>
          
          <Link
            to="/practice"
            className="card text-center hover:shadow-md transition-shadow"
          >
            <FiAward className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <h3 className="font-semibold">Achievements</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              View your earned badges
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;