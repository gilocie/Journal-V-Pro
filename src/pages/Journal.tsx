import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

export default function Journal() {
  const [user] = useAuthState(auth);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Journal Entries</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-lg font-medium text-gray-700">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{format(new Date(), 'MMMM d, yyyy')}</p>
                <h3 className="font-medium text-gray-900 mt-1">Today's Entry</h3>
                <p className="text-gray-600 mt-2">
                  No entry recorded yet for today. Click to start recording.
                </p>
              </div>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Mood Trends</h3>
            <p className="text-gray-600">Start journaling to see your mood trends!</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Entry Streak</h3>
            <p className="text-gray-600">Record your first entry to start your streak!</p>
          </div>
        </div>
      </div>
    </div>
  );
}