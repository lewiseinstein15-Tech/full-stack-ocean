import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle,
  FiArrowRight, FiCheck,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from 'contexts/AuthContext';
import { AuroraBackground, Shake } from 'components/motion/motion';

const Field = ({ label, icon: Icon, error, children }) => (
  <div>
    <label className="block text-xs font-black uppercase tracking-[0.14em] text-espresso-500 mb-2">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-400 pointer-events-none" />
      {children}
    </div>
    {error && <p className="mt-1.5 text-xs font-semibold text-blush-600">{error}</p>}
  </div>
);

const PasswordStrength = ({ password }) => {
  const checks = [
    { label: '8+ characters', ok: password.length >= 8 },
    { label: 'Number', ok: /\d/.test(password) },
    { label: 'Uppercase', ok: /[A-Z]/.test(password) },
    { label: 'Symbol', ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const barColors = ['#e8ac7d', '#e8ac7d', '#e3c372', '#d9a441', '#7fa98c'];
  return (
    <div className="mt-2.5">
      <div className="flex gap-1.5 mb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 flex-1 rounded-full"
            animate={{
              backgroundColor: i < score ? barColors[score] : 'rgba(138,100,34,0.15)',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {checks.map((c, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-1 text-[11px] font-bold transition-colors ${
              c.ok ? 'text-sage-600' : 'text-espresso-400'
            }`}
          >
            <motion.span animate={{ scale: c.ok ? [0.8, 1.15, 1] : 1 }} transition={{ duration: 0.35 }}>
              {c.ok ? <FiCheck className="w-3 h-3" /> : <FiAlertCircle className="w-3 h-3" />}
            </motion.span>
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    else if (formData.username.length < 3)
      newErrors.username = 'Username must be at least 3 characters';
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.username))
      newErrors.username = 'Letters, numbers and underscores only';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please provide a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = 'Please agree to the terms to continue';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setServerError('');

    const result = await register(
      formData.username,
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );

    if (result.success) {
      navigate('/dashboard');
    } else {
      setServerError(result.error || 'Unable to create your account. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AuroraBackground />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl"
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
              <FiUser className="w-8 h-8 text-espresso-800" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold brand-title">Full Stack Ocean</h1>
            <p className="text-espresso-500 text-xs mt-2 tracking-[0.22em] font-bold">
              CHAMPAGNE EDITION
            </p>
          </div>

          <h2 className="font-display text-2xl font-bold text-espresso-800 mb-1 text-center">
            Create your account
          </h2>
          <p className="text-center text-espresso-500 text-sm mb-8">
            Start your daily study ritual today
          </p>

          <Shake trigger={!!serverError}>
            {serverError && (
              <div
                className="mb-6 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
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
            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" icon={FiUser} error={errors.firstName}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Lewis"
                  className="skeu-input pl-11"
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Last name" icon={FiUser} error={errors.lastName}>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Einstein"
                  className="skeu-input pl-11"
                  autoComplete="family-name"
                />
              </Field>
            </div>

            <Field label="Username" icon={FiUser} error={errors.username}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="ocean_explorer"
                className="skeu-input pl-11"
                autoComplete="username"
              />
            </Field>

            <Field label="Email" icon={FiMail} error={errors.email}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="skeu-input pl-11"
                autoComplete="email"
              />
            </Field>

            {/* Passwords */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Password" icon={FiLock} error={errors.password}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="skeu-input pl-11 pr-11"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-espresso-400 hover:text-honey-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </Field>
              <Field label="Confirm" icon={FiLock} error={errors.confirmPassword}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="skeu-input pl-11 pr-11"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-espresso-400 hover:text-honey-600 transition-colors"
                  aria-label="Toggle confirm visibility"
                >
                  {showConfirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </Field>
            </div>

            {/* Strength meter (full width) */}
            <div className="sm:max-w-[calc(50%-0.5rem)]">
              <PasswordStrength password={formData.password} />
            </div>

            {/* Terms */}
            <div>
              <label className="skeu-check text-sm text-espresso-600 items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <span className="track mt-0.5 shrink-0">
                  <span className="knob" />
                </span>
                <span>
                  I agree to the{' '}
                  <span className="font-bold text-honey-700">Terms of Service</span> and{' '}
                  <span className="font-bold text-honey-700">Privacy Policy</span>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1.5 text-xs font-semibold text-blush-600">
                  {errors.agreeToTerms}
                </p>
              )}
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
                  Creating account…
                </>
              ) : (
                <>
                  Create Account <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <div className="gold-divider mb-6" />
            <p className="text-sm text-espresso-600">
              Already sailing with us?{' '}
              <Link
                to="/login"
                className="font-bold text-honey-700 hover:text-honey-600 underline decoration-honey-300 decoration-2 underline-offset-4 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
