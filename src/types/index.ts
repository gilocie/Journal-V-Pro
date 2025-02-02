export interface User {
  uid: string;
  name: string;
  email: string;
  profilePicture?: string;
  notificationsEnabled: boolean;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  audioUrl?: string;
  transcribedText: string;
  mood: 'positive' | 'neutral' | 'negative';
  aiFeedback?: string;
}

export interface DailyPrompt {
  id: string;
  date: Date;
  promptText: string;
}