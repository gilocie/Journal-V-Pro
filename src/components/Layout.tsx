import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookMarked, Settings, LogOut } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function Layout() {
  const [user] = useAuthState(auth);
  const location = useLocation();

  const handleSignOut = () => {
    signOut(auth);
  };

  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed h-screen w-16 bg-white border-r border-gray-200">
          <div className="flex flex-col items-center h-full py-4">
            <nav className="flex-1 space-y-8">
              <Link
                to="/"
                className={`p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Home size={24} />
              </Link>
              <Link
                to="/journal"
                className={`p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                  location.pathname === '/journal' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <BookMarked size={24} />
              </Link>
              <Link
                to="/settings"
                className={`p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                  location.pathname === '/settings' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Settings size={24} />
              </Link>
            </nav>
            <button
              onClick={handleSignOut}
              className="p-3 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-16">
          <main className="container mx-auto px-4 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}