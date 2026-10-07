import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Basic validation
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      setIsSubmitting(false);
      return;
    }
    if (!formData.password) {
      setErrors({ password: 'Password is required' });
      setIsSubmitting(false);
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
              }`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <FiAlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                errors.password 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
              }`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <FiAlertCircle className="h-4 w-4 mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            id="remember"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Remember me for 30 days
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full btn btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;