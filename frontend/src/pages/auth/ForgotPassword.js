import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiAlertCircle, FiSend } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <Link
          to="/login"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <FiArrowLeft className="h-4 w-4 mr-1" />
          Back to Login
        </Link>
      </div>

      {!isSubmitted ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-2">Forgot Password?</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 ${
                    error 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <FiAlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Sending...
                </span>
              ) : (
                <>
                  <FiSend className="mr-2 h-4 w-4" />
                  Send Reset Link
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSend className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a password reset link to <strong>{email}</strong>. 
            Please check your inbox (and spam folder).
          </p>
          <Link to="/login" className="btn btn-secondary">
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;