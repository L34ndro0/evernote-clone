// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpW5-6VFwsmARhbIjFogvExOL8SL7AgsE",
  authDomain: "evernoteclone-d20b4.firebaseapp.com",
  projectId: "evernoteclone-d20b4",
  storageBucket: "evernoteclone-d20b4.appspot.com",
  messagingSenderId: "20035973525",
  appId: "1:20035973525:web:61b5b24bfbd86eaa6e469c",
  measurementId: "G-PYYHXJ129G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
