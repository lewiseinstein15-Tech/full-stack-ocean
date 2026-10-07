import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiFileText, FiUsers, FiClock, FiBook, FiExternalLink } from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';

const CourseDetail = () => {
  const { courseCode } = useParams();
  const { fetchCourse } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      const data = await fetchCourse(courseCode);
      setCourse(data);
      setLoading(false);
    };
    
    loadCourse();
  }, [courseCode, fetchCourse]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'lectures', label: 'Lectures' },
    { id: 'assignments', label: 'Assignments' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The course "{courseCode}" could not be found.
        </p>
        <Link to="/courses" className="btn btn-primary">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/courses"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <FiArrowLeft className="mr-2 h-4 w-4" />
        Back to Courses
      </Link>

      {/* Course Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {course.courseCode}
          </span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
            {course.term}
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{course.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
            <FiClock className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Weekly Hours</div>
              <div className="font-semibold">{course.weeklyHours || 'N/A'}h</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
            <FiUsers className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Instructor</div>
              <div className="font-semibold">{course.instructor || 'MIT Faculty'}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
            <FiBook className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Term</div>
              <div className="font-semibold">{course.term || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Course Overview</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p>This course is part of the Full Stack Ocean curriculum and provides comprehensive coverage of {course.title.toLowerCase()}.</p>
                
                {course.resources?.lectures && course.resources.lectures.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold mt-4">Lecture Resources</h4>
                    <ul>
                      {course.resources.lectures.slice(0, 5).map((lecture, idx) => (
                        <li key={idx}>
                          <a 
                            href={lecture.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-600 dark:text-primary-400 hover:underline flex items-center"
                          >
                            {lecture.title}
                            <FiExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'lectures' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Lecture Videos</h3>
              {course.resources?.lectures && course.resources.lectures.length > 0 ? (
                <div className="space-y-3">
                  {course.resources.lectures.map((lecture, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                      <div>
                        <span className="font-medium">{lecture.title || `Lecture ${idx + 1}`}</span>
                        {lecture.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{lecture.description}</p>
                        )}
                      </div>
                      <a
                        href={lecture.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        <FiExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No lecture resources available yet.</p>
              )}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Assignments & Exams</h3>
              {course.resources?.assignments && course.resources.assignments.length > 0 ? (
                <div className="space-y-3">
                  {course.resources.assignments.map((assignment, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                      <div>
                        <span className="font-medium">{assignment.title || `Assignment ${idx + 1}`}</span>
                        {assignment.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.description}</p>
                        )}
                      </div>
                      <a
                        href={assignment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        <FiExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No assignments available yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Weeks */}
      <div>
        <h2 className="text-xl font-bold mb-4">Study Schedule</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This course is scheduled as part of Term 1 (October 2026 - January 2027).
          Check the <Link to="/today" className="text-primary-600 dark:text-primary-400 hover:underline">daily schedule</Link> for specific lessons.
        </p>
      </div>
    </div>
  );
};

export default CourseDetail;