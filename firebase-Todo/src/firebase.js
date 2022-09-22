// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXUZzCvVnBEDktNqJUWbju7iOLmMdO9uo",
  authDomain: "todo-list-759af.firebaseapp.com",
  databaseURL: "https://todo-list-759af-default-rtdb.firebaseio.com",
  projectId: "todo-list-759af",
  storageBucket: "todo-list-759af.appspot.com",
  messagingSenderId: "887115987500",
  appId: "1:887115987500:web:a743a03de0937eec32af89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();

