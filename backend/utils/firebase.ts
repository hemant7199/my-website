"use client";

import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// ✅ ENV CONFIG
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ✅ SAFE INIT (prevents re-initialization error)
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

// ✅ AUTH
export const auth = getAuth(app);

// ✅ PROVIDERS
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();