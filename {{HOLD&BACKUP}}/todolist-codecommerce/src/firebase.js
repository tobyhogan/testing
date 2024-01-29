// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfWDkJbOItAqDlPZiY0lQlAfJ1U4B7g00",
  authDomain: "meditazen-todo-conversion.firebaseapp.com",
  projectId: "meditazen-todo-conversion",
  storageBucket: "meditazen-todo-conversion.appspot.com",
  messagingSenderId: "976620370404",
  appId: "1:976620370404:web:9e5ab2ef954f8c97512ff1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);