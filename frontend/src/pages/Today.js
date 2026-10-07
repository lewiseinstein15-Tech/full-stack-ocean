import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiCheck, FiPlay, FiFileText, FiSun, FiLink, FiMap } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

const Today = () => {
  const { 
    user, 
    fetchToday, 
    completeLesson, 
    uncompleteLesson,
    checkLessonCompleted 
  } = useAuth();
  
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonStatus, setLessonStatus] = useState({});

  useEffect(() => {
    const loadToday = async () => {
      setLoading(true);
      const data = await fetchToday();
      setToday(data);
      
      // Check completion status
      if (data?.lessons) {
        const status = {};
        for (const lesson of data.lessons) {
          status[lesson._id || lesson.id] = await checkLessonCompleted(lesson._id || lesson.id);
        }
        setLessonStatus(status);
      }
      setLoading(false);
    };
    
    loadToday();
  }, [fetchToday, checkLessonCompleted]);

  const handleToggleComplete = async (lesson) => {
    const lessonId = lesson._id || lesson.id;
    const hours = (lesson.duration || 90) / 60;
    
    if (lessonStatus[lessonId]) {
      await uncompleteLesson(lessonId, hours);
    } else {
      const result = await completeLesson(lessonId, hours);
      if (result) {
        setLessonStatus(prev => ({ ...prev, [lessonId]: true }));
      }
    }
  };

  const getDayLabel = (date) => {
    const d = new Date(date);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'EEEE, MMMM d, yyyy');
  };

  const getCourseColor = (courseCode) => {
    const colors = {
      '6.0001': 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20',
      '18.01SC': 'border-l-green-500 bg-green-50 dark:bg-green-900/20',
      '6.042J': 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20',
    };
    return colors[courseCode] || 'border-l-gray-500 bg-gray-50 dark:bg-gray-800';
  };

  const getCourseTagColor = (courseCode) => {
    const colors = {
      '6.0001': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      '18.01SC': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      '6.042J': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    };
    return colors[courseCode] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          {today ? getDayLabel(today.date) : 'Loading...'}
        </h1>
        {today?.isReviewDay && (
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
            <FiSun className="h-5 w-5 mr-2" />
            <span className="font-medium">Review Day</span>
          </div>
        )}
        {today?.upcoming && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            No lessons scheduled for today. Next lessons: {today.dayOfWeek}
          </p>
        )}
      </div>

      {/* Review Day Content */}
      {today?.isReviewDay && today?.reviewNotes && (
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
            <FiMap className="h-5 w-5 mr-2" />
            Review Focus
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{today.reviewNotes}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : today?.lessons && today.lessons.length > 0 ? (
        <div className="space-y-6">
          {today.lessons.map((lesson, idx) => {
            const lessonId = lesson._id || lesson.id;
            const completed = lessonStatus[lessonId];

            return (
              <div
                key={lessonId}
                className={`card border-l-4 ${getCourseColor(lesson.metadata?.course)} ${completed ? 'opacity-75' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Course Tag */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCourseTagColor(lesson.metadata?.course)}`}>
                        {lesson.metadata?.course || 'Course'}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <FiClock className="h-4 w-4 mr-1" />
                        {lesson.duration} min
                      </span>
                      {lesson.metadata?.lectureNumber && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Lecture {lesson.metadata.lectureNumber}
                        </span>
                      )}
                    </div>

                    {/* Lesson Title & Description */}
                    <h2 className="text-xl font-bold mb-1">{lesson.title}</h2>
                    {lesson.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {lesson.description}
                      </p>
                    )}

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      {lesson.lectureLink && (
                        <a
                          href={lesson.lectureLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                        >
                          <FiPlay className="mr-2 h-4 w-4" />
                          <span className="font-medium">
                            {lesson.lectureLink.title || 'Watch Lecture'}
                          </span>
                        </a>
                      )}
                      {lesson.practiceLink && (
                        <a
                          href={lesson.practiceLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors"
                        >
                          <FiFileText className="mr-2 h-4 w-4" />
                          <span className="font-medium">
                            {lesson.practiceLink.title || 'Practice Problems'}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Complete Button */}
                  <button
                    onClick={() => handleToggleComplete(lesson)}
                    className={`ml-4 p-3 rounded-full transition-all duration-200 ${
                      completed
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 scale-110'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                    }`}
                    title={completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    <FiCheck className="h-6 w-6" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Review Notes Section */}
          {today.reviewNotes && (
            <div className="card bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center">
                <FiSun className="h-4 w-4 mr-2" />
                Today's Review Notes
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{today.reviewNotes}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">No Lessons Today</h3>
          <p className="text-gray-600 dark:text-gray-400">
            There are no lessons scheduled for today. Check back tomorrow or explore the calendar.
          </p>
        </div>
      )}
    </div>
  );
};

export default Today;