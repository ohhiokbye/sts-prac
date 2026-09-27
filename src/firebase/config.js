// Firebase configuration
// TODO(security): Replace with your actual Firebase config from the Firebase Console.
// These values are public client-side keys (not secrets), but should match your project.
// Go to: Firebase Console → Project Settings → Your apps → Web app → Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyA9-6yg3CLhV9DEGdBP-RnI5RE9ZlOEyQI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'sts-prac.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'sts-prac',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'sts-prac.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '959475083820',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:959475083820:web:6612f623d1b8e2f0d7bf89',
};

export default firebaseConfig;
