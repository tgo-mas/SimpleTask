// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export { auth };

