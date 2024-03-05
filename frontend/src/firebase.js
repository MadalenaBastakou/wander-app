// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "new-project-62f6d.firebaseapp.com",
  projectId: "new-project-62f6d",
  storageBucket: "new-project-62f6d.appspot.com",
  messagingSenderId: "154238202928",
  appId: "1:154238202928:web:606c1b12c04078c66429f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);