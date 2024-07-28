const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZAyeMh-koVKVbPoX1tKms8HjHbg5srnU",
  authDomain: "grocify-df396.firebaseapp.com",
  projectId: "grocify-df396",
  storageBucket: "grocify-df396.appspot.com",
  messagingSenderId: "1000825564295",
  appId: "1:1000825564295:web:45a898ed388ed915b61c22",
  measurementId: "G-JC7EZBVV3G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function runAuthTests() {
  try {
    const email = "testuser@example.com";
    const password = "password123";

    // Create a new user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Created user with email:", userCredential.user.email);

    // Sign in the user
    const signInCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Signed in user with email:", signInCredential.user.email);

    // Sign out the user
    await signOut(auth);
    console.log("Signed out user");

  } catch (error) {
    console.error("Error running Auth tests:", error);
  }
}

runAuthTests();
