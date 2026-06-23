
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// A function to check if the config is valid, to avoid crashing the server build.
export function isFirebaseConfigValid(config: typeof firebaseConfig): boolean {
  return (
    !!config.apiKey &&
    !!config.authDomain &&
    !!config.projectId &&
    !!config.storageBucket &&
    !!config.messagingSenderId &&
    !!config.appId
  );
}


// Initialize Firebase only if the config is valid
const isConfigValid = isFirebaseConfigValid(firebaseConfig);
const app = !getApps().length && isConfigValid ? initializeApp(firebaseConfig) : (getApps().length > 0 ? getApp() : null);
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;

export { app, auth, db, firebaseConfig };
