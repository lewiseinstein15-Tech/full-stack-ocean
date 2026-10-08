import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set axios default base URL
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Load user on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get('/auth/me');
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success('Welcome back!');
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (username, email, password, firstName, lastName) => {
    try {
      const res = await axios.post('/auth/register', { 
        username, email, password, firstName, lastName 
      });
      const { token, user } = res.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success('Account created successfully!');
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
  };

  const updateProfile = async (data) => {
    try {
      const res = await axios.put('/user/profile', data);
      setUser(prev => ({ ...prev, ...res.data.user }));
      toast.success('Profile updated');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Update failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateUserPreferences = async (preferences) => {
    try {
      const res = await axios.put('/progress/preferences', { preferences });
      setUser(prev => ({
        ...prev,
        preferences: { ...prev.preferences, ...res.data.preferences }
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Update failed' };
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await axios.get('/progress');
      return res.data.progress;
    } catch (error) {
      return null;
    }
  };

  const fetchLesson = async (slug) => {
    try {
      const res = await axios.get(`/curriculum/lesson/${slug}`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  const fetchToday = async () => {
    try {
      const res = await axios.get('/curriculum/today');
      return res.data.today;
    } catch (error) {
      return null;
    }
  };

  const completeLesson = async (lessonId, hours = 1.5) => {
    try {
      const res = await axios.post(`/progress/lesson/${lessonId}/complete`, { hours });
      toast.success('Lesson completed! Keep going!');
      try {
        const me = await axios.get('/auth/me');
        if (me.data && me.data.user) setUser(me.data.user);
      } catch (_) { /* stats refresh is best-effort */ }
      return res.data;
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to mark complete';
      toast.error(message);
      return null;
    }
  };

  const uncompleteLesson = async (lessonId, hours = 1.5) => {
    try {
      await axios.delete(`/progress/lesson/${lessonId}/complete?hours=${hours}`);
      try {
        const me = await axios.get('/auth/me');
        if (me.data && me.data.user) setUser(me.data.user);
      } catch (_) { /* stats refresh is best-effort */ }
      return true;
    } catch (error) {
      return false;
    }
  };

  const checkLessonCompleted = async (lessonId) => {
    try {
      const res = await axios.get(`/progress/check/${lessonId}`);
      return res.data.completed;
    } catch (error) {
      return false;
    }
  };

  const fetchCurriculum = async () => {
    try {
      const res = await axios.get(`/curriculum`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  const fetchWeek = async (curriculumId, termId, weekId) => {
    try {
      const res = await axios.get(`/curriculum/${curriculumId}/term/${termId}/week/${weekId}`);
      return res.data.week;
    } catch (error) {
      return null;
    }
  };

  const fetchCourse = async (courseCode) => {
    try {
      const res = await axios.get(`/curriculum/course/${courseCode}`);
      return res.data.course;
    } catch (error) {
      return null;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    updateUserPreferences,
    fetchProgress,
    fetchToday,
    fetchLesson,
    completeLesson,
    uncompleteLesson,
    checkLessonCompleted,
    fetchCurriculum,
    fetchWeek,
    fetchCourse,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;