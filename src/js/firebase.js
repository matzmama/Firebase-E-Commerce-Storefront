// Import Firebase core + services
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPo80GZ9j8Z5o6pMC65Z-u90dfljCzw9M",
  authDomain: "fir-e-commerce-app-b3cb0.firebaseapp.com",
  projectId: "fir-e-commerce-app-b3cb0",
  storageBucket: "fir-e-commerce-app-b3cb0.firebasestorage.app",
  messagingSenderId: "1088132504728",
  appId: "1:1088132504728:web:af2a8b10fa0a7bca7444ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);   // ✅ Firestore (THIS FIXES YOUR ERROR)
export const auth = getAuth(app);      // ✅ Auth (optional but good to have)