// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMQjpdWzef_zYtzDUXXb_MkQ1DSeOge3Y",
  authDomain: "space-tiger-tarot-db.firebaseapp.com",
  projectId: "space-tiger-tarot-db",
  storageBucket: "space-tiger-tarot-db.appspot.com",
  messagingSenderId: "480613114246",
  appId: "1:480613114246:web:fc9b517f993193570f4c07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 
export const auth = getAuth(app)