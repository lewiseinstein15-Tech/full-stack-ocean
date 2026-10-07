import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) newErrors.username = 'Username can only contain letters, numbers, and underscores';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please provide a valid email';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    const result = await register(
      formData.username,
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                errors.firstName 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
              }`}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                errors.lastName 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
              }`}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                errors.username 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
              }`}
              placeholder="johndoe123"
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <FiAlertCircle className="h-4 w-4 mr-1" />
              {errors.username}
            </p>
          )}
        </div>

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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
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

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                errors.confirmPassword 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
              }`}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <FiAlertCircle className="h-4 w-4 mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            id="terms"
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-500 flex items-center">
            <FiAlertCircle className="h-4 w-4 mr-1" />
            {errors.agreeToTerms}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full btn btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;