import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiArrowRight, FiLogIn } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from 'contexts/AuthContext';
import { AuroraBackground, Shake } from 'components/motion/motion';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setServerError('');

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
    } else {
      setServerError(result.error || 'Unable to sign in. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AuroraBackground />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="glass-strong rounded-[2rem] p-8 sm:p-10">
          {/* Brand */}
          <div className="text-center mb-8">
            <motion.div
              className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{
                background: 'linear-gradient(145deg, #f2d894 0%, #d9a441 55%, #c9932f 100%)',
                border: '1px solid rgba(138,100,34,.5)',
                boxShadow:
                  '0 10px 24px rgba(138,100,34,.35), inset 0 2px 0 rgba(255,255,255,.7), inset 0 -3px 0 rgba(92,65,28,.2)',
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiLogIn className="w-8 h-8 text-espresso-800" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold brand-title">Full Stack Ocean</h1>
            <p className="text-espresso-500 text-xs mt-2 tracking-[0.22em] font-bold">
              CHAMPAGNE EDITION
            </p>
          </div>

          <h2 className="font-display text-2xl font-bold text-espresso-800 mb-1 text-center">
            Welcome back
          </h2>
          <p className="text-center text-espresso-500 text-sm mb-8">
            Your daily study ritual awaits
          </p>

          <Shake trigger={!!serverError}>
            {serverError && (
              <div className="mb-6 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
                style={{
                  background: 'rgba(216, 144, 95, 0.18)',
                  border: '1px solid rgba(176, 111, 71, 0.35)',
                  color: '#8a5a32',
                }}
              >
                <FiAlertCircle className="w-4 h-4 shrink-0" />
                {serverError}
              </div>
            )}
          </Shake>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-black uppercase tracking-[0.14em] text-espresso-500 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`skeu-input pl-11 ${errors.email ? 'ring-2 ring-blush-400' : ''}`}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs font-semibold text-blush-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black uppercase tracking-[0.14em] text-espresso-500 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`skeu-input pl-11 pr-11 ${errors.password ? 'ring-2 ring-blush-400' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-espresso-400 hover:text-honey-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-semibold text-blush-600">{errors.password}</p>
              )}
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between">
              <label className="skeu-check text-sm text-espresso-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span className="track">
                  <span className="knob" />
                </span>
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-bold text-honey-700 hover:text-honey-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1, scale: 0.99 }}
              className="btn btn-gold w-full py-3 text-base"
            >
              {isSubmitting ? (
                <>
                  <span className="gold-spinner !w-5 !h-5" style={{ filter: 'none' }} />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Switch */}
          <div className="mt-8 text-center">
            <div className="gold-divider mb-6" />
            <p className="text-sm text-espresso-600">
              New to the ocean?{' '}
              <Link
                to="/register"
                className="font-bold text-honey-700 hover:text-honey-600 underline decoration-honey-300 decoration-2 underline-offset-4 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
