// Import the functions from the modular SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC35CT_qBIRT_kXxB9sc5BHNfAcSnb6lNo",
  authDomain: "clone-10728.firebaseapp.com",
  projectId: "clone-10728",
  storageBucket: "clone-10728.appspot.com", // Fixed storageBucket format
  messagingSenderId: "662957596410",
  appId: "1:662957596410:web:7ccb801123c9801331b343"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };