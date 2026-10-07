import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

// Layouts
import Layout from 'components/layout/Layout';
import AuthLayout from 'components/layout/AuthLayout';

// Public Pages
import Home from 'pages/Home';
import Courses from 'pages/Courses';
import CourseDetail from 'pages/CourseDetail';

// Auth Pages
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

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      } />
      
      <Route path="/courses" element={
        <Layout>
          <Courses />
        </Layout>
      } />
      
      <Route path="/courses/:courseCode" element={
        <Layout>
          <CourseDetail />
        </Layout>
      } />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <AuthLayout><Login /></AuthLayout>
          )
        }
      />
      
      <Route
        path="/today"
        element={
          user ? (
            <Layout>
              <Today />
            </Layout>
          ) : (
            <AuthLayout><Login /></AuthLayout>
          )
        }
      />
      
      <Route
        path="/week/:weekId"
        element={
          user ? (
            <Layout>
              <WeekView />
            </Layout>
          ) : (
            <AuthLayout><Login /></AuthLayout>
          )
        }
      />
      
      <Route
        path="/progress"
        element={
          user ? (
            <Layout>
              <Progress />
            </Layout>
          ) : (
            <AuthLayout><Login /></AuthLayout>
          )
        }
      />
      
      <Route
        path="/profile"
        element={
          user ? (
            <Layout>
              <Profile />
            </Layout>
          ) : (
            <AuthLayout><Login /></AuthLayout>
          )
        }
      />
      
      <Route
        path="/practice"
        element={
          user ? (
            <Layout>
              <Practice />
            </Layout>
          ) : (
            <AuthLayout><Login /></AuthLayout>
          )
        }
      />
    </Routes>
  );
};

export default App;