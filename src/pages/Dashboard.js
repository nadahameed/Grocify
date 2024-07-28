import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import './Dashboard.css';

function Dashboard() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      if (auth.currentUser) {
        const listsCollection = collection(db, 'users', auth.currentUser.uid, 'lists');
        const listsSnapshot = await getDocs(listsCollection);
        const listsData = listsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLists(listsData);
      } else {
        // Redirect to login if not authenticated
        navigate('/');
      }
    };

    fetchLists();
  }, [navigate]);

  const handleCreateList = async () => {
    if (newListName) {
      const newList = { name: newListName, items: [] };
      const docRef = await addDoc(collection(db, 'users', auth.currentUser.uid, 'lists'), newList);
      setLists([...lists, { id: docRef.id, ...newList }]);
      setNewListName('');
    }
  };

  const handleAddItem = async () => {
    if (newItemName && newItemCategory && selectedList !== null) {
      const updatedLists = lists.map((list, index) => {
        if (index === selectedList) {
          return {
            ...list,
            items: [...list.items, { name: newItemName, category: newItemCategory }]
          };
        }
        return list;
      });

      const listDoc = doc(db, 'users', auth.currentUser.uid, 'lists', lists[selectedList].id);
      await updateDoc(listDoc, { items: updatedLists[selectedList].items });

      setLists(updatedLists);
      setNewItemName('');
      setNewItemCategory('');
    }
  };

  const handleSelectList = (index) => {
    setSelectedList(index);
  };

  const handleLogout = () => {
    // Implement any additional logout logic if needed
    navigate('/');
  };

  // Placeholder for share functionality
  const handleShareList = (index) => {
    console.log(`Share list at index: ${index}`);
    // Implement share functionality here
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <h1 className="dashboard-header">Dashboard</h1>
      <div className="new-list-section">
        <input
          type="text"
          placeholder="Enter list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={handleCreateList}>Create New List</button>
      </div>
      <div className="lists-section">
        <h2>Lists</h2>
        {lists.length === 0 && <p>No lists available. Create a new list to get started.</p>}
        <ul>
          {lists.map((list, index) => (
            <li key={index} className="list-item">
              <span onClick={() => handleSelectList(index)}>{list.name}</span>
              <button className="share-button" onClick={() => handleShareList(index)}>Share</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedList !== null && (
        <div className="items-section">
          <h2>{lists[selectedList].name} Items</h2>
          <input
            type="text"
            placeholder="Enter item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter item category"
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
          />
          <button onClick={handleAddItem}>Add Item</button>
          <ul>
            {lists[selectedList].items.map((item, index) => (
              <li key={index}>
                {item.name} ({item.category})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

