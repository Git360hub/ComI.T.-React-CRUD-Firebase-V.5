// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo3PXe04RPr6nKdUzlVx1nUB7xsJ1UTEU",
  authDomain: "react2025-9d5dc.firebaseapp.com",
  projectId: "react2025-9d5dc",
  storageBucket: "react2025-9d5dc.firebasestorage.app",
  messagingSenderId: "199052155718",
  appId: "1:199052155718:web:c8ce6d065d06950f872347",
  measurementId: "G-PX4GM8RR95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);