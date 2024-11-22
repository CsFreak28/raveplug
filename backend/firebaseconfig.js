// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaYnrO5xzVAj180Pmtps9T8p_591gmS20",
  authDomain: "raveplug-818f7.firebaseapp.com",
  projectId: "raveplug-818f7",
  storageBucket: "raveplug-818f7.firebasestorage.app",
  messagingSenderId: "134799388026",
  appId: "1:134799388026:web:83c5dfc4c76396dd7a7ac3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
