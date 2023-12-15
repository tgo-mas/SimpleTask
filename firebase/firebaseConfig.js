// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiuj_-trCJslfKJ2azqQVhC8a7cvRwjrQ",
  authDomain: "react-simple-task.firebaseapp.com",
  projectId: "react-simple-task",
  storageBucket: "react-simple-task.appspot.com",
  messagingSenderId: "346057681791",
  appId: "1:346057681791:web:5c65ce7ab0033c4292c84a",
  measurementId: "G-RRWQ74FFJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar banco de dados
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };

