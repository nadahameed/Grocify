// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="container">
      <h1 className="header">Welcome to Grocify</h1>
      <p className="paragraph">A collaborative shopping list app for family and friends.</p>
      <Link className="link" to="/signup">Sign Up</Link>
      <br />
      <Link className="link" to="/login">Login</Link>
      <div className="footer">
        <p>
          &copy; 2024 Grocify. All rights reserved.{' '} By{' '}
          <Link to="/terms">Chiebuka</Link> and <Link to="/privacy">Nada</Link>{'.'}
        </p>
      </div>
    </div>
  );
}

export default HomePage;