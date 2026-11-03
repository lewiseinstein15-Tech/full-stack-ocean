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
import Progress from 'pages/Progress';
import Profile from 'pages/Profile';
import Practice from 'pages/Practice';
import Courses from 'pages/Courses';
import Study from 'pages/Study';
import CourseDetail from 'pages/CourseDetail';
import Library from 'pages/Library';
import Jobs from 'pages/Jobs';

const hasToken = () => Boolean(localStorage.getItem('token'));

/* Auth gate: renders the sidebar shell (with <Outlet/>) immediately and lets
   auth hydrate in the background — the server may be waking from a free-tier
   cold start, and waiting for it would leave a blank screen. Redirect to the
   sign-in entry only once the server has actually rejected the session. */
const ProtectedShell = () => {
  const { user, loading } = useAuth();
  if (!user && !loading) return <Navigate to="/login" replace />;
  return <Layout />;
};

const App = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Entry: straight into the app when a session token exists (the shell
            paints instantly, auth hydrates in the background); sign-in otherwise */}
        <Route
          path="/"
          element={
            user || (loading && hasToken()) ? (
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
          <Route path="/study/:slug" element={<Study />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseCode" element={<CourseDetail />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/library" element={<Library />} />
          <Route path="/jobs" element={<Jobs />} />
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
