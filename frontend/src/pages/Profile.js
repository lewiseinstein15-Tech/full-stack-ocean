import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiCalendar, FiSave, FiEdit2, FiShield, FiSettings, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile, updateUserPreferences, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    theme: 'system',
    dailyGoal: 2,
    reminderTime: '08:00',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        theme: user.preferences?.theme || 'system',
        dailyGoal: user.preferences?.dailyGoal || 2,
        reminderTime: user.preferences?.notifications?.reminderTime || '08:00',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
    });
    
    if (result.success) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handlePreferenceChange = async (key, value) => {
    const result = await updateUserPreferences({
      [key]: value,
      ...(key === 'theme' && { theme: value }),
    });
  };

  const handleLogout = () => {
    logout();
  };

  const stats = [
    { label: 'Days Active', value: '24' },
    { label: 'Total Lessons', value: user?.progress?.completedLessons?.length || 0 },
    { label: 'Hours Learned', value: Math.round(user?.progress?.totalHours || 0) },
    { label: 'Current Streak', value: user?.progress?.streak || 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-2 rounded-lg transition-colors ${
              isEditing
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FiEdit2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-3xl text-white font-bold">
            {user?.firstName?.[0] || user?.username?.[0] || 'U'}
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">@{user?.username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-900 dark:text-gray-100">{user?.firstName || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-900 dark:text-gray-100">{user?.lastName || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-900 dark:text-gray-100">{user?.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <p className="text-gray-900 dark:text-gray-100 flex items-center">
              {user?.email}
              <FiMail className="ml-2 h-4 w-4 text-gray-400" />
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Saving...' : <><FiSave className="mr-2 h-4 w-4" />Save Changes</>}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-xl font-bold mb-4">Learning Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="card text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex gap-3">
              {['light', 'dark', 'system'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => handlePreferenceChange('theme', theme)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.theme === theme
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span>Daily Goal</span>
              <span>{formData.dailyGoal} hours</span>
            </label>
            <input
              type="range"
              name="dailyGoal"
              min="1"
              max="8"
              value={formData.dailyGoal}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Reminder Time
            </label>
            <input
              type="time"
              name="reminderTime"
              value={formData.reminderTime}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Notifications
            </label>
            <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 rounded" />
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="card border border-red-200 dark:border-red-900/30">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to log out of all devices?')) {
                handleLogout();
              }
            }}
            className="text-left p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            Log Out From All Devices
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                // Handle account deletion
              }
            }}
            className="text-left p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;