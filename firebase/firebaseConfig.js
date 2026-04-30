import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { Platform } from 'react-native';

// 🔥 SOLO para React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDlXmsCJJLuk4O-99l5IiBPotIAGZDHuww",
  authDomain: "smartvial-32464.firebaseapp.com",
  projectId: "smartvial-32464",
  storageBucket: "smartvial-32464.firebasestorage.app",
  messagingSenderId: "106338022623",
  appId: "1:106338022623:web:c06ac3fdd702cb9680256a"
};

const app = initializeApp(firebaseConfig);

let auth;

// 🔥 AQUÍ ESTÁ LA CLAVE
if (Platform.OS === 'web') {
  // 🌐 WEB
  auth = getAuth(app);
} else {
  // 📱 REACT NATIVE
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { auth, db };