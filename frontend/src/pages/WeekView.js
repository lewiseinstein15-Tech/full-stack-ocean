import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  FiChevronLeft, FiChevronRight, FiCheck, FiPlay, FiFileText, FiSun, 
  FiBarChart2, FiAward, FiUsers, FiFilter, FiBookOpen 
} from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks, isToday } from 'date-fns';

const WeekView = () => {
  const { weekId } = useParams();
  const navigate = useNavigate();
  const { fetchToday, completeLesson, uncompleteLesson, checkLessonCompleted } = useAuth();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayData, setTodayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonStatus, setLessonStatus] = useState({});

  // Calculate week bounds
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  useEffect(() => {
    const loadToday = async () => {
      setLoading(true);
      const data = await fetchToday();
      setTodayData(data);
      
      // Check completion status for all lessons in this week
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
  }, [fetchToday, checkLessonCompleted, currentDate]);

  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () => {
    const nextWeek = addWeeks(currentDate, 1);
    // Don't allow navigating past the end of the curriculum
    const curriculumEnd = new Date('2027-01-05');
    if (nextWeek <= curriculumEnd) {
      setCurrentDate(nextWeek);
    }
  };
  const goToToday = () => setCurrentDate(new Date());

  const handleToggleComplete = async (lesson) => {
    const lessonId = lesson._id || lesson.id;
    const hours = (lesson.duration || 90) / 60;
    
    if (lessonStatus[lessonId]) {
      await uncompleteLesson(lessonId, hours);
    } else {
      await completeLesson(lessonId, hours);
    }
    setLessonStatus(prev => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPreviousWeek}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        
        <h1 className="text-2xl font-bold">
          {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
        </h1>
        
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors"
          >
            Today
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}

        {/* Day Cells */}
        {days.map((day) => {
          const isCurToday = isToday(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const hasLessons = todayData && isSameDay(new Date(todayData.date), day);
          
          return (
            <div
              key={day}
              className={`
                min-h-[80px] p-2 border border-gray-200 dark:border-gray-700 rounded-lg
                ${isCurToday ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'bg-white dark:bg-gray-800'}
                ${!isCurrentMonth ? 'opacity-50' : ''}
              `}
            >
              <div className="flex justify-between items-start">
                <span className={`text-sm font-medium ${isCurToday ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}>
                  {format(day, 'd')}
                </span>
                {hasLessons && todayData?.isReviewDay && (
                  <FiSun className="h-3 w-3 text-blue-500" />
                )}
              </div>
              
              {hasLessons && todayData?.lessons && (
                <div className="mt-1 space-y-1">
                  {todayData.lessons.slice(0, 2).map((lesson, idx) => (
                    <div key={lesson._id || idx} className="text-xs truncate">
                      <span className={`block ${lessonStatus[lesson._id || lesson.id] ? 'line-through text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        {lesson.title}
                      </span>
                      <span className={`inline-block px-1 rounded text-xs ${
                        lesson.metadata?.course === '6.0001' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        lesson.metadata?.course === '18.01SC' ? 'bg-green-100 dark:bg-green-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {lesson.metadata?.course || ''}
                      </span>
                    </div>
                  ))}
                  {todayData.lessons.length > 2 && (
                    <span className="text-xs text-gray-500">+{todayData.lessons.length - 2} more</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Week Details */}
      {todayData && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              Week {todayData.week || 'Current'}: {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d')}
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              todayData.isReviewDay 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}>
              {todayData.isReviewDay ? 'Review Day' : 'Study Day'}
            </span>
          </div>

          {todayData.isReviewDay ? (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Review Focus</h3>
              <p className="text-gray-700 dark:text-gray-300">{todayData.reviewNotes}</p>
            </div>
          ) : todayData.lessons?.length > 0 ? (
            <div className="space-y-4">
              {todayData.lessons.map((lesson, idx) => {
                const lessonId = lesson._id || lesson.id;
                const completed = lessonStatus[lessonId];

                return (
                  <div key={lessonId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lesson.metadata?.course === '6.0001' 
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                            : lesson.metadata?.course === '18.01SC'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                        }`}>
                          {lesson.metadata?.course}
                        </span>
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({lesson.duration} min)
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleToggleComplete(lesson)}
                        className={`p-1 rounded transition-colors ${
                          completed
                            ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                            : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                        }`}
                        title={completed ? 'Mark incomplete' : 'Mark complete'}
                      >
                        <FiCheck className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="mt-2 flex gap-4">
                      {lesson.slug ? (
                        <Link
                          to={`/study/${lesson.slug}`}
                          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
                        >
                          <FiBookOpen className="h-3 w-3 mr-1" />
                          Study in app
                        </Link>
                      ) : (
                        <>
                          {lesson.lectureLink && (
                            <a
                              href={lesson.lectureLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
                            >
                              <FiPlay className="h-3 w-3 mr-1" />
                              Lecture
                            </a>
                          )}
                          {lesson.practiceLink && (
                            <a
                              href={lesson.practiceLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 flex items-center"
                            >
                              <FiFileText className="h-3 w-3 mr-1" />
                              Practice
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No lessons available for this week.</p>
          )}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  );
};

export default WeekView;