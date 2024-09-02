import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="left-section">
        <a href="#home" className="logo">
          <img src="src/assets/logo.png" alt="Logo" className="logo-image" />
          <h2>SparRow</h2>
        </a>
        <nav className="navigation">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#candidates">Candidates</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
      </div>
      <div className="right-section">
        <button className="connect-btn">
          <img src="src/assets/wallet1.png" alt="Wallet Icon" className="wallet-icon" />
        </button>
        <button className="profile-btn">
          <img src='src/assets/profile-icon.png' alt='Profile Icon' className="profile-icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
