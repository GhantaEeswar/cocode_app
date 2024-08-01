// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYQ5-xZMdsXXNsqeTD1dYBCYGXl1jgTmE",
  authDomain: "cocode-c8d06.firebaseapp.com",
  projectId: "cocode-c8d06",
  storageBucket: "cocode-c8d06.appspot.com",
  messagingSenderId: "546626635234",
  appId: "1:546626635234:web:f47fc5855ef27bb853e5bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);