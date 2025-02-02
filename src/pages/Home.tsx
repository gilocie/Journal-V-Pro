import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { Mic, Square, Save, X } from 'lucide-react';
import { useVoiceRecorder } from '../lib/useVoiceRecorder';

export default function Home() {
  const [user] = useAuthState(auth);
  const {
    isRecording,
    transcribedText,
    error,
    startRecording,
    stopRecording,
    saveRecording,
  } = useVoiceRecorder(user?.uid || '');

  const [showRecordingControls, setShowRecordingControls] = useState(false);

  const handleStartRecording = async () => {
    setShowRecordingControls(true);
    await startRecording();
  };

  const handleStopRecording = async () => {
    await stopRecording();
  };

  const handleSaveRecording = async () => {
    await saveRecording();
    setShowRecordingControls(false);
  };

  const handleCancelRecording = () => {
    if (isRecording) {
      stopRecording();
    }
    setShowRecordingControls(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.displayName || 'Friend'}!
        </h1>
        <p className="text-gray-600">
          Today's prompt: What made you smile today?
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="text-center py-8">
          {!showRecordingControls ? (
            <button
              onClick={handleStartRecording}
              className="bg-blue-600 text-white rounded-full p-6 hover:bg-blue-700 transition-colors"
            >
              <Mic size={32} />
            </button>
          ) : (
            <div className="space-y-4">
              {isRecording ? (
                <div className="space-y-4">
                  <button
                    onClick={handleStopRecording}
                    className="bg-red-600 text-white rounded-full p-6 hover:bg-red-700 transition-colors animate-pulse"
                  >
                    <Square size={32} />
                  </button>
                  {transcribedText && (
                    <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{transcribedText}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {transcribedText && (
                    <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{transcribedText}</p>
                    </div>
                  )}
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleSaveRecording}
                      className="bg-green-600 text-white rounded-full p-4 hover:bg-green-700 transition-colors"
                    >
                      <Save size={24} />
                    </button>
                    <button
                      onClick={handleCancelRecording}
                      className="bg-gray-600 text-white rounded-full p-4 hover:bg-gray-700 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <p className="mt-4 text-gray-600">
            {isRecording
              ? 'Speaking... Click the square to stop'
              : showRecordingControls && transcribedText
              ? 'Review your entry and save or cancel'
              : 'Tap to start speaking your journal entry'}
          </p>
          {error && (
            <p className="mt-2 text-red-600 text-sm">{error}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h2>
          <div className="space-y-4">
            <p className="text-gray-600">No entries yet. Start journaling!</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mood Insights</h2>
          <div className="space-y-4">
            <p className="text-gray-600">Record your first entry to see insights!</p>
          </div>
        </div>
      </div>
    </div>
  );
}