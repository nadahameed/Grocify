// src/firestoreOperations.js

import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Add a new shopping list
const addShoppingList = async (name, ownerId, collaborators) => {
  try {
    const docRef = await addDoc(collection(db, "shoppingLists"), {
      name,
      ownerId,
      collaborators,
      createdAt: new Date(),
    });
    console.log("Shopping list written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding shopping list: ", e);
  }
};

// Add a new item to a shopping list
const addItemToList = async (listId, name, quantity) => {
  try {
    const docRef = await addDoc(collection(db, "items"), {
      listId,
      name,
      quantity,
      completed: false,
      createdAt: new Date(),
    });
    console.log("Item written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding item: ", e);
  }
};

// Get user shopping lists
const getUserShoppingLists = async (userId) => {
  try {
    const q = query(collection(db, "shoppingLists"), where("ownerId", "==", userId));
    const querySnapshot = await getDocs(q);
    const lists = [];
    querySnapshot.forEach((doc) => {
      lists.push({ id: doc.id, ...doc.data() });
    });
    return lists;
  } catch (e) {
    console.error("Error getting shopping lists: ", e);
  }
};

// Get items in a shopping list
const getItemsInList = async (listId) => {
  try {
    const q = query(collection(db, "items"), where("listId", "==", listId));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (e) {
    console.error("Error getting items: ", e);
  }
};

// Update an item in a shopping list
const updateItemInList = async (itemId, updateData) => {
  try {
    const itemRef = doc(db, "items", itemId);
    await updateDoc(itemRef, updateData);
    console.log("Item updated with ID: ", itemId);
  } catch (e) {
    console.error("Error updating item: ", e);
  }
};

// Delete an item from a shopping list
const deleteItemFromList = async (itemId) => {
  try {
    const itemRef = doc(db, "items", itemId);
    await deleteDoc(itemRef);
    console.log("Item deleted with ID: ", itemId);
  } catch (e) {
    console.error("Error deleting item: ", e);
  }
};

export {
  addShoppingList,
  addItemToList,
  getUserShoppingLists,
  getItemsInList,
  updateItemInList,
  deleteItemFromList
};
