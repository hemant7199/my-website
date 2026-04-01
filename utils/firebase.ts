import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// ✅ FIXED PROVIDERS
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();