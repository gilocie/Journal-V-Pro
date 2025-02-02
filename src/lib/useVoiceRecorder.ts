import { useState, useCallback, useRef } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

interface RecordingState {
  isRecording: boolean;
  transcribedText: string;
  error: string | null;
}

export function useVoiceRecorder(userId: string) {
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    transcribedText: '',
    error: null,
  });
  
  const recognition = useRef<SpeechRecognition | null>(null);

  const startRecording = useCallback(async () => {
    try {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error('Speech recognition is not supported in this browser.');
      }

      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        setState((prev) => ({
          ...prev,
          transcribedText: finalTranscript.trim(),
        }));
      };

      recognition.current.onerror = (event) => {
        setState((prev) => ({
          ...prev,
          error: `Error occurred during transcription: ${event.error}`,
        }));
      };

      recognition.current.start();
      setState((prev) => ({ ...prev, isRecording: true, error: null }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Could not start speech recognition',
      }));
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (recognition.current) {
      recognition.current.stop();
      setState((prev) => ({ ...prev, isRecording: false }));
    }
  }, []);

  const saveRecording = useCallback(async () => {
    if (!state.transcribedText) return null;

    try {
      // Create journal entry in Firestore
      const entryRef = await addDoc(collection(db, 'journal_entries'), {
        userId,
        date: new Date().toISOString(),
        transcribedText: state.transcribedText,
        mood: 'neutral', // This can be enhanced with sentiment analysis
        createdAt: new Date().toISOString()
      });

      // Clear recording state
      setState({
        isRecording: false,
        transcribedText: '',
        error: null
      });

      return entryRef.id;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to save entry. Please try again.',
      }));
      return null;
    }
  }, [state.transcribedText, userId]);

  return {
    isRecording: state.isRecording,
    transcribedText: state.transcribedText,
    error: state.error,
    startRecording,
    stopRecording,
    saveRecording,
  };
}