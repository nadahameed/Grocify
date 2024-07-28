// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZAyeMh-koVKVbPoX1tKms8HjHbg5srnU",
  authDomain: "grocify-df396.firebaseapp.com",
  projectId: "grocify-df396",
  storageBucket: "grocify-df396.appspot.com",
  messagingSenderId: "1000825564295",
  appId: "1:1000825564295:web:45a898ed388ed915b61c22",
  measurementId: "G-JC7EZBVV3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
