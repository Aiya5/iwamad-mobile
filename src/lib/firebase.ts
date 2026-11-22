import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDJeF5iR6DS2HpHCIsbSRAEjIF6WzOzjzA",
  authDomain: "iwamad-chat-ba695.firebaseapp.com",
  databaseURL: "https://iwamad-chat-ba695-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iwamad-chat-ba695",
  storageBucket: "iwamad-chat-ba695.firebasestorage.app",
  messagingSenderId: "1010105840211",
  appId: "1:1010105840211:web:39a3c8d97274f8980a0ca6"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);