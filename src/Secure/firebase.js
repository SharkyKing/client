// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu_OFOeEL5CznVF_Tc0unZKGa8woF9LQA",
  authDomain: "binectusokay.firebaseapp.com",
  projectId: "binectusokay",
  storageBucket: "binectusokay.appspot.com",
  messagingSenderId: "1091392407595",
  appId: "1:1091392407595:web:6b63bb6db95f0ea873c26e",
  measurementId: "G-HG09R424K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)