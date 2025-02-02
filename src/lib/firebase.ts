import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDEzYpvVXvn8mms28s5f_07tpZIJiVn6EU",
  authDomain: "journal-app-f7db9.firebaseapp.com",
  projectId: "journal-app-f7db9",
  storageBucket: "journal-app-f7db9.firebasestorage.app",
  messagingSenderId: "42588236389",
  appId: "1:42588236389:web:555f914a27a22f1f2bf48c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);