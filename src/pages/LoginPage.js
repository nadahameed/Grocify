import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import necessary functions from Firebase Auth
import { auth } from '../firebase'; // Ensure you import auth from your firebase.js
import './AuthPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password); // Add logging
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in'); // Add logging
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error); // Add logging
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-header">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
