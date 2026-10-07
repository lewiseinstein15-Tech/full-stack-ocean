import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookOpen, FiTrendingUp, FiSun, FiCheckCircle } from 'react-icons/fi';
import { MdWaves } from 'react-icons/md';
import { AuroraBackground } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

/* Segmented Sign In / Create Account control with sliding gold pill */
const AuthTabs = () => {
  const { pathname } = useLocation();
  const isRegister = pathname === '/register';
  return (
    <div className="glass-inset rounded-2xl p-1.5 flex relative">
      <motion.div
        className="absolute top-1.5 bottom-1.5 rounded-xl"
        style={{
          width: 'calc(50% - 6px)',
          left: isRegister ? 'calc(50% + 3px)' : '6px',
          background: 'linear-gradient(180deg, #f2d894 0%, #d9a441 100%)',
          boxShadow: '0 3px 8px rgba(138,100,34,.3), inset 0 1px 0 rgba(255,255,255,.6)',
          transition: 'left .35s cubic-bezier(.22,1,.36,1)',
        }}
      />
      <Link
        to="/login"
        className={`relative z-10 flex-1 text-center py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 ${
          !isRegister ? 'text-espresso-800' : 'text-espresso-500'
        }`}
      >
        Sign In
      </Link>
      <Link
        to="/register"
        className={`relative z-10 flex-1 text-center py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 ${
          isRegister ? 'text-espresso-800' : 'text-espresso-500'
        }`}
      >
        Create Account
      </Link>
    </div>
  );
};

/* Floating showcase card on the left panel */
const FloatCard = ({ icon: Icon, title, sub, delay, className = '' }) => (
  <motion.div
    className={`glass rounded-2xl p-4 flex items-center gap-3 absolute ${className}`}
    initial={{ opacity: 0, y: 30, rotate: -2 }}
    animate={{ opacity: 1, y: 0, rotate: -1.5 }}
    transition={{ delay, duration: 0.8, ease: EASE }}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' }}
      className="flex items-center gap-3"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: 'linear-gradient(180deg, #fff8e5, #f4e5ae)',
          border: '1px solid rgba(255,255,255,.7)',
          boxShadow: 'inset 0 1px 0 #fff, 0 3px 8px rgba(92,65,28,.15)',
        }}
      >
        <Icon className="w-5 h-5 text-honey-600" />
      </div>
      <div>
        <div className="text-sm font-bold text-espresso-800">{title}</div>
        <div className="text-xs text-espresso-500">{sub}</div>
      </div>
    </motion.div>
  </motion.div>
);

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isRegister = pathname === '/register';

  return (
    <div className="min-h-screen relative flex items-center justify-center py-10 px-4 sm:px-8 overflow-hidden">
      <AuroraBackground />

      <div className="relative w-full max-w-5xl">
        <div className="glass-strong rounded-[2.25rem] overflow-hidden grid lg:grid-cols-[1.05fr_1fr]">
          {/* ---------- Left: brand showcase ---------- */}
          <div className="relative hidden lg:block p-10 xl:p-12 overflow-hidden min-h-[620px]">
            {/* soft spotlight */}
            <div
              className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(242,217,148,.75) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative"
            >
              {/* Brand mark */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(145deg, #f2d894 0%, #d9a441 55%, #c9932f 100%)',
                    border: '1px solid rgba(138,100,34,.5)',
                    boxShadow: '0 10px 24px rgba(138,100,34,.35), inset 0 2px 0 rgba(255,255,255,.7), inset 0 -3px 0 rgba(92,65,28,.2)',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MdWaves className="w-8 h-8 text-espresso-800" />
                </motion.div>
                <div>
                  <h1 className="font-display text-4xl font-bold brand-title leading-tight">
                    Full Stack Ocean
                  </h1>
                  <p className="text-espresso-500 text-sm mt-1 tracking-wide">
                    CHAMPAGNE EDITION
                  </p>
                </div>
              </div>

              <h2 className="font-display text-[1.7rem] leading-snug text-espresso-800 max-w-md text-balance">
                {isRegister ? (
                  <>Begin your <em className="text-honey-600">daily ritual</em> of becoming a
                  computer scientist.</>
                ) : (
                  <>Welcome back to your <em className="text-honey-600">daily ritual</em> of
                  mastery.</>
                )}
              </h2>
              <p className="mt-4 text-espresso-600 max-w-md leading-relaxed">
                A meticulously crafted MIT timetable — Python, Calculus and Mathematics
                for Computer Science — served every single day in glass and gold.
              </p>

              <hr className="gold-divider my-8 max-w-md" />

              {/* Ritual steps */}
              <div className="space-y-3.5 max-w-md">
                {[
                  { icon: FiSun, text: 'Wake up to a curated set of lectures' },
                  { icon: FiCheckCircle, text: 'Complete lessons, keep your streak glowing' },
                  { icon: FiTrendingUp, text: 'Watch your mastery grow week by week' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-sm text-espresso-700"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: EASE }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: 'linear-gradient(180deg, #fff8e5, #f4e5ae)',
                        border: '1px solid rgba(255,255,255,.7)',
                        boxShadow: 'inset 0 1px 0 #fff, 0 2px 5px rgba(92,65,28,.12)',
                      }}
                    >
                      <s.icon className="w-4 h-4 text-honey-600" />
                    </div>
                    {s.text}
                  </motion.div>
                ))}
              </div>

              {/* Floating mini cards */}
              <FloatCard
                icon={FiBookOpen}
                title="MIT 6.0001 · Python"
                sub="Lecture of the day"
                delay={0.9}
                className="bottom-10 -right-2"
              />
              <FloatCard
                icon={FiTrendingUp}
                title="Week 1 · Day 3"
                sub="You're on track"
                delay={1.15}
                className="bottom-32 -right-8"
              />
            </motion.div>
          </div>

          {/* ---------- Right: auth form ---------- */}
          <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col">
            {/* Mobile brand (visible when showcase hidden) */}
            <div className="lg:hidden mb-8 text-center">
              <motion.div
                className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(145deg, #f2d894 0%, #d9a441 55%, #c9932f 100%)',
                  boxShadow: '0 10px 24px rgba(138,100,34,.35), inset 0 2px 0 rgba(255,255,255,.7)',
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <MdWaves className="w-7 h-7 text-espresso-800" />
              </motion.div>
              <h1 className="font-display text-3xl font-bold brand-title">Full Stack Ocean</h1>
              <p className="text-espresso-500 text-xs mt-1 tracking-widest">CHAMPAGNE EDITION</p>
            </div>

            <AuthTabs />

            <motion.div
              key={isRegister ? 'register' : 'login'}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mt-8 flex-grow"
            >
              <Outlet />
            </motion.div>

            <p className="mt-6 text-center text-xs text-espresso-400">
              🌊 Full Stack Ocean · crafted in champagne &amp; vanilla
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
