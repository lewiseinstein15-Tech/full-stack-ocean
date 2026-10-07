import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Shared motion primitives for the Champagne Atelier design system.
   Built on framer-motion (github.com/framer/motion) — the most widely
   used React animation library on GitHub. */

const EASE = [0.22, 1, 0.36, 1];

/* Page-level transition: fade + rise + subtle blur-out */
export const PageTransition = ({ children, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
    transition={{ duration: 0.45, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* Simple fade-slide in when scrolled into view */
export const FadeIn = ({ children, delay = 0, y = 24, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* Stagger container + item pair */
export const Stagger = ({ children, className = '', delay = 0.05 }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: delay } },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 26, scale: 0.98 },
      visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.5, ease: EASE },
      },
    }}
  >
    {children}
  </motion.div>
);

/* Glass card with hover lift + tilt shimmer */
export const GlassCard = ({ children, className = '', hover = true, onClick }) => (
  <motion.div
    className={`glass rounded-3xl ${className}`}
    onClick={onClick}
    whileHover={hover ? { y: -6, boxShadow: '0 24px 56px rgba(92,65,28,0.18), 0 8px 20px rgba(92,65,28,0.1), inset 0 1px 0 rgba(255,255,255,0.85)' } : undefined}
    whileTap={onClick ? { scale: 0.985 } : undefined}
    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
  >
    {children}
  </motion.div>
);

/* Floating background orbs — the living champagne sea */
export const AuroraBackground = ({ dense = false }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <motion.div
      className="orb"
      style={{
        width: 520, height: 520, top: '-8%', left: '-6%',
        background: 'radial-gradient(circle, #f2c9a0 0%, transparent 70%)',
      }}
      animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.12, 0.95, 1] }}
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="orb"
      style={{
        width: 460, height: 460, bottom: '-12%', right: '-8%',
        background: 'radial-gradient(circle, #dfc37a 0%, transparent 70%)',
      }}
      animate={{ x: [0, -70, 40, 0], y: [0, 50, -25, 0], scale: [1, 0.92, 1.1, 1] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="orb"
      style={{
        width: 340, height: 340, top: '34%', left: '52%',
        background: 'radial-gradient(circle, #fff4d6 0%, transparent 70%)',
        opacity: 0.45,
      }}
      animate={{ x: [0, 45, -55, 0], y: [0, -30, 20, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
    {dense && (
      <motion.div
        className="orb"
        style={{
          width: 300, height: 300, top: '12%', right: '22%',
          background: 'radial-gradient(circle, #bfd8c8 0%, transparent 70%)',
          opacity: 0.4,
        }}
        animate={{ x: [0, -35, 25, 0], y: [0, 35, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}
    {/* Fine sparkle dust */}
    {Array.from({ length: 14 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 3 + (i % 3),
          height: 3 + (i % 3),
          top: `${(i * 37) % 100}%`,
          left: `${(i * 61) % 100}%`,
          background: 'rgba(217, 164, 65, 0.5)',
          filter: 'blur(1px)',
        }}
        animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.3, 0.8], y: [0, -18, 0] }}
        transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

/* Error shake wrapper */
export const Shake = ({ children, trigger, className = '' }) => (
  <motion.div
    className={className}
    animate={trigger ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
    key={trigger ? 'shake' : 'calm'}
  >
    {children}
  </motion.div>
);

/* Animated counter for stats */
export const CountUp = ({ value = 0, duration = 1.2, className = '' }) => {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span className={className}>{display}</span>;
};

export { motion, AnimatePresence };
