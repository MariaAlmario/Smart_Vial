import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDlXmsCJJLuk4O-99l5IiBPotIAGZDHuww",
  authDomain: "smartvial-32464.firebaseapp.com",
  projectId: "smartvial-32464",
  storageBucket: "smartvial-32464.firebasestorage.app",
  messagingSenderId: "106338022623",
  appId: "1:106338022623:web:c06ac3fdd702cb9680256a"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);