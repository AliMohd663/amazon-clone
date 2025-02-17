// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/auth";
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore"
import "firebase/compat/auth"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC35CT_qBIRT_kXxB9sc5BHNfAcSnb6lNo",
  authDomain: "clone-10728.firebaseapp.com",
  projectId: "clone-10728",
  storageBucket: "clone-10728.firebasestorage.app",
  messagingSenderId: "662957596410",
  appId: "1:662957596410:web:7ccb801123c9801331b343"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();