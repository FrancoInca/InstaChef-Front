// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyC3x15ApR4ULgQ4xxv9XwbdePmjXrj1EyQ",
  authDomain: "instachef-fb29e.firebaseapp.com",
  projectId: "instachef-fb29e",
  storageBucket: "instachef-fb29e.appspot.com",
  messagingSenderId: "855849609760",
  appId: "1:855849609760:web:21dc3d331011dc31242a45",
  measurementId: "G-VW8F3RR9DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const storage = getStorage(app)

