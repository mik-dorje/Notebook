// https://www.youtube.com/watch?v=9bXhf_TELP4
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBA3PNEOtXZBpmawnDv9MFfFaGQGPZPaYk",
  authDomain: "notebook-e0626.firebaseapp.com",
  projectId: "notebook-e0626",
  storageBucket: "notebook-e0626.appspot.com",
  messagingSenderId: "495093421056",
  appId: "1:495093421056:web:167aa815cf95db0a9b74e5",
  measurementId: "G-J2T4ZHX9DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)