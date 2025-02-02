import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import { Bell, User, Shield, Moon } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';

export default function Settings() {
  const [user] = useAuthState(auth);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleNotificationToggle = async () => {
    if (!user) return;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        notificationsEnabled: !notificationsEnabled
      });
      setNotificationsEnabled(!notificationsEnabled);
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="border-b pb-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="border-b pb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Daily Reminders</p>
                <p className="text-sm text-gray-500">Receive daily journaling prompts</p>
              </div>
              <button
                onClick={handleNotificationToggle}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="border-b pb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Privacy</h2>
            </div>
            <p className="text-gray-600">
              Your journal entries are encrypted and only accessible to you.
            </p>
          </div>

          {/* Appearance Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Moon className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Dark Mode</p>
                <p className="text-sm text-gray-500">Toggle dark theme</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}