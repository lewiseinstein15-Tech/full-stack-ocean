import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';

// Layouts
import Layout from 'components/layout/Layout';
import AuthLayout from 'components/layout/AuthLayout';

// Auth Pages (first screen)
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import ForgotPassword from 'pages/auth/ForgotPassword';

// Protected Pages
import Dashboard from 'pages/Dashboard';
import Today from 'pages/Today';
import WeekView from 'pages/WeekView';
import Progress from 'pages/Progress';
import Profile from 'pages/Profile';
import Practice from 'pages/Practice';
import Courses from 'pages/Courses';
import CourseDetail from 'pages/CourseDetail';

const CenterSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="gold-spinner" />
  </div>
);

/* Auth gate: renders sidebar shell (with <Outlet/>) when signed in,
   otherwise redirects to the sign-in entry. */
const ProtectedShell = () => {
  const { user, loading } = useAuth();
  if (loading) return <CenterSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  return <Layout />;
};

const App = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Entry: sign in or create account first */}
        <Route
          path="/"
          element={
            loading ? (
              <CenterSpinner />
            ) : user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Auth routes — first screen */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected app routes (sidebar shell) */}
        <Route element={<ProtectedShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/today" element={<Today />} />
          <Route path="/week/:weekId?" element={<WeekView />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseCode" element={<CourseDetail />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
