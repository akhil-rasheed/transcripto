// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6IGneqcHju_WBW6umhCir59xTvksrkN4",
  authDomain: "hackmitten-auth.firebaseapp.com",
  projectId: "hackmitten-auth",
  storageBucket: "hackmitten-auth.appspot.com",
  messagingSenderId: "646981053971",
  appId: "1:646981053971:web:4179df4a216f88715259e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
