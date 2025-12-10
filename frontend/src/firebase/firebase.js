// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvgqutnvns1z61WyDM_8QOsg6b2ffFxUY",
  authDomain: "progwebapp-b010f.firebaseapp.com",
  projectId: "progwebapp-b010f",
  storageBucket: "progwebapp-b010f.firebasestorage.app",
  messagingSenderId: "356834179122",
  appId: "1:356834179122:web:d0a6c6dc0fa802cdd3a42b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services to use them in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
