// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQtLWHodymWCuaKndHc8QmyVmOv6Y4zpI",
  authDomain: "assignment-new-9fe66.firebaseapp.com",
  projectId: "assignment-new-9fe66",
  storageBucket: "assignment-new-9fe66.appspot.com",
  messagingSenderId: "240054103661",
  appId: "1:240054103661:web:1b3ec6b47fae9c9d839964",
  measurementId: "G-5N81TLDJRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
