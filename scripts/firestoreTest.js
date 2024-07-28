const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, addDoc } = require("firebase/firestore");

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
const db = getFirestore(app);

async function runFirestoreTests() {
  try {
    // Add a new shopping list
    const listRef = collection(db, "shoppingLists");
    const res = await addDoc(listRef, {
      name: "Test List",
      owner: "testUser",
      collaborators: ["user123", "user456"]
    });
    console.log("Added shopping list with ID:", res.id);

    // Get user shopping lists
    const snapshot = await getDocs(listRef);
    const lists = snapshot.docs.map(doc => doc.data());
    console.log("User shopping lists:", lists);

  } catch (error) {
    console.error("Error running Firestore tests:", error);
  }
}

runFirestoreTests();
