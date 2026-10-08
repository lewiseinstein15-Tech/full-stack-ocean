import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiGrid, FiSun, FiCalendar, FiBookOpen, FiEdit3,
  FiTrendingUp, FiUser, FiLogOut, FiMenu, FiX, FiChevronsLeft, FiChevronsRight, FiAward,
  FiBriefcase,
} from 'react-icons/fi';
import { MdWaves } from 'react-icons/md';
import { useAuth } from 'contexts/AuthContext';
import { AuroraBackground } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

/* Navigation model — categories first-class citizens */
const NAV = [
  {
    category: 'Overview',
    items: [
      { to: '/dashboard', icon: FiGrid, label: 'Dashboard', end: true },
      { to: '/today', icon: FiSun, label: 'Today', end: true },
    ],
  },
  {
    category: 'Study',
    items: [
      { to: '/week', icon: FiCalendar, label: 'Week View' },
      { to: '/courses', icon: FiBookOpen, label: 'Courses', end: true },
      { to: '/practice', icon: FiEdit3, label: 'Practice' },
      { to: '/library', icon: FiBookOpen, label: 'Library' },
    ],
  },
  {
    category: 'Career',
    items: [
      { to: '/jobs', icon: FiBriefcase, label: 'Jobs', end: true },
    ],
  },
  {
    category: 'Insights',
    items: [{ to: '/progress', icon: FiTrendingUp, label: 'Progress' }],
  },
  {
    category: 'Account',
    items: [{ to: '/profile', icon: FiUser, label: 'Profile' }],
  },
];

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/today': 'Today',
  '/week': 'Week View',
  '/courses': 'Courses',
  '/practice': 'Practice',
  '/library': 'Library',
  '/jobs': 'Jobs',
  '/progress': 'Progress',
  '/profile': 'Profile',
};

const Brand = ({ collapsed }) => (
  <div className={`flex items-center gap-3 px-2 ${collapsed ? 'justify-center' : ''}`}>
    <motion.div
      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
      style={{
        background: 'linear-gradient(145deg, #f2d894 0%, #d9a441 55%, #c9932f 100%)',
        border: '1px solid rgba(138,100,34,.5)',
        boxShadow:
          '0 6px 16px rgba(138,100,34,.32), inset 0 2px 0 rgba(255,255,255,.7), inset 0 -2px 0 rgba(92,65,28,.2)',
      }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <MdWaves className="w-6 h-6 text-espresso-800" />
    </motion.div>
    {!collapsed && (
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <div className="font-display text-lg font-bold brand-title leading-tight">Full Stack</div>
        <div className="font-display text-lg font-bold brand-title leading-tight">Ocean</div>
      </motion.div>
    )}
  </div>
);

const NavItem = ({ item, collapsed, onNavigate }) => {
  const { pathname } = useLocation();
  const active =
    item.to === '/week'
      ? pathname.startsWith('/week')
      : item.end
      ? pathname === item.to
      : pathname.startsWith(item.to);
  return (
    <NavLink to={item.to} onClick={onNavigate} className="block" title={collapsed ? item.label : undefined}>
      <div className="nav-item">
        {active && (
          <motion.div
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(180deg, #f2d894 0%, #d9a441 100%)',
              boxShadow: '0 4px 12px rgba(138,100,34,.35), inset 0 1px 0 rgba(255,255,255,.6)',
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}
        <item.icon
          className={`w-[18px] h-[18px] relative z-10 shrink-0 transition-colors ${
            active ? 'text-espresso-800' : 'text-espresso-500'
          }`}
        />
        {!collapsed && (
          <span
            className={`relative z-10 transition-colors ${
              active ? 'text-espresso-800 font-extrabold' : ''
            }`}
          >
            {item.label}
          </span>
        )}
      </div>
    </NavLink>
  );
};

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const width = collapsed ? 84 : 264;

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 p-4 glass-strong !rounded-[1.75rem] my-4 ml-4"
        animate={{ width }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{ borderRadius: '1.75rem' }}
      >
        <div className="px-1.5 pt-2 pb-5">
          <Brand collapsed={collapsed} />
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar space-y-5 px-1">
          {NAV.map((group) => (
            <div key={group.category}>
              {!collapsed ? (
                <div className="nav-category mb-1.5">{group.category}</div>
              ) : (
                <div className="gold-divider my-3 mx-auto w-8" />
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem key={item.to} item={item} collapsed={collapsed} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User chip */}
        <div className="pt-3 border-t border-white/50">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'px-1'}`}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-espresso-800"
              style={{
                background: 'linear-gradient(180deg, #fff8e5, #f2d894)',
                border: '1px solid rgba(255,255,255,.8)',
                boxShadow: 'inset 0 1px 0 #fff, 0 3px 8px rgba(92,65,28,.18)',
              }}
              title={user?.username}
            >
              {(user?.firstName?.[0] || user?.username?.[0] || 'S').toUpperCase()}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-espresso-800 truncate">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.username}
                </div>
                <div className="text-[11px] text-espresso-500 truncate">{user?.email}</div>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={handleLogout}
                className="btn-round w-9 h-9 shrink-0"
                title="Sign out"
                aria-label="Sign out"
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            )}
          </div>
          {collapsed && (
            <button
              onClick={handleLogout}
              className="btn-round w-9 h-9 mx-auto mt-2"
              title="Sign out"
              aria-label="Sign out"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="btn-round w-9 h-9 mx-auto mt-4 shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FiChevronsRight className="w-4 h-4" /> : <FiChevronsLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-espresso-900/35 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 z-50 w-[280px] p-4 glass-strong lg:hidden flex flex-col !rounded-[1.75rem] my-4 ml-4"
              initial={{ x: -320, opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0.6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="flex items-center justify-between px-1.5 pt-2 pb-5">
                <Brand collapsed={false} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="btn-round w-9 h-9"
                  aria-label="Close menu"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto no-scrollbar space-y-5 px-1">
                {NAV.map((group) => (
                  <div key={group.category}>
                    <div className="nav-category mb-1.5">{group.category}</div>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <NavItem
                          key={item.to}
                          item={item}
                          collapsed={false}
                          onNavigate={() => setMobileOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
              <div className="pt-3 border-t border-white/50 flex items-center gap-3 px-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-espresso-800"
                  style={{
                    background: 'linear-gradient(180deg, #fff8e5, #f2d894)',
                    boxShadow: 'inset 0 1px 0 #fff, 0 3px 8px rgba(92,65,28,.18)',
                  }}
                >
                  {(user?.firstName?.[0] || user?.username?.[0] || 'S').toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-espresso-800 truncate">
                    {user?.firstName ? `${user.firstName} ${user?.lastName || ''}`.trim() : user?.username}
                  </div>
                </div>
                <button onClick={handleLogout} className="btn-round w-9 h-9" aria-label="Sign out">
                  <FiLogOut className="w-4 h-4" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* Top bar */
const TopBar = ({ collapsed, onMobileMenu }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const title =
    PAGE_TITLES[Object.keys(PAGE_TITLES).find((k) => pathname.startsWith(k)) || '/dashboard'] ||
    'Dashboard';
  const streak = user?.progress?.streak || 0;
  const todayStr = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-4 pb-3 backdrop-blur-md">
      <div className="glass rounded-2xl px-4 sm:px-5 py-3 flex items-center gap-3">
        <button onClick={onMobileMenu} className="btn-round w-9 h-9 lg:hidden" aria-label="Open menu">
          <FiMenu className="w-4 h-4" />
        </button>
        <div className="min-w-0">
          <h1 className="font-display text-xl font-bold text-espresso-800 leading-tight truncate">
            {title}
          </h1>
          <p className="text-[11px] text-espresso-500 hidden sm:block">{todayStr}</p>
        </div>
        <div className="flex-1" />
        {streak > 0 && (
          <motion.div
            className="status-badge status-pending !px-3.5 !py-1.5"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            title="Current streak"
          >
            <FiAward className="w-3.5 h-3.5" />
            {streak} day{streak === 1 ? '' : 's'}
          </motion.div>
        )}
        <div
          className="w-9 h-9 rounded-full hidden sm:flex items-center justify-center text-xs font-black text-espresso-800 shrink-0"
          style={{
            background: 'linear-gradient(180deg, #fff8e5, #f2d894)',
            border: '1px solid rgba(255,255,255,.8)',
            boxShadow: 'inset 0 1px 0 #fff, 0 3px 8px rgba(92,65,28,.18)',
          }}
        >
          {(user?.firstName?.[0] || user?.username?.[0] || 'S').toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const Layout = () => {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('fso-sidebar-collapsed') === '1';
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    try {
      localStorage.setItem('fso-sidebar-collapsed', collapsed ? '1' : '0');
    } catch {
      /* noop */
    }
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const marginLeft = collapsed ? 108 : 288;
  const pageRef = useRef(null);

  return (
    <div className="min-h-screen relative">
      <AuroraBackground />
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <motion.main
        className="relative min-h-screen px-4 sm:px-6 lg:px-8 pb-12"
        animate={{ marginLeft: window.innerWidth >= 1024 ? marginLeft : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        <TopBar collapsed={collapsed} onMobileMenu={() => setMobileOpen(true)} />

        <div className="max-w-5xl mx-auto mt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              ref={pageRef}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
              transition={{ duration: 0.4, ease: EASE }}
              onAnimationComplete={() => {
                /* A lingering CSS filter/transform makes this wrapper the
                   containing block for position:fixed children, which breaks
                   full-viewport overlays (book reader). Clear it once the page
                   transition settles. */
                if (pageRef.current) {
                  pageRef.current.style.filter = 'none';
                  pageRef.current.style.transform = 'none';
                }
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
};

export default Layout;
