import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/logo.png';
import walletIcon from '../assets/Wallet1.png';
import profileIcon from '../assets/profile-icon.png';

// Real wallet connection and disconnection functions
const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error("Failed to connect wallet", error);
      return '';
    }
  } else {
    alert("Please install MetaMask!");
    return '';
  }
};

const disconnectWallet = () => {
  return Promise.resolve();
};

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletStatus, setWalletStatus] = useState('Disconnected');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletStatus('Connected');
          setIsWalletConnected(true);
          setHasError(false);
        }
      }
    };
    checkWalletConnection();
  }, []);

  const handleWalletClick = async () => {
    if (isWalletConnected) {
      await disconnectWallet();
      setWalletAddress('');
      setWalletStatus('Disconnected');
      setIsWalletConnected(false);
      setHasError(false);
    } else {
      const address = await connectWallet();
      if (address) {
        setWalletAddress(address);
        setWalletStatus('Connected');
        setIsWalletConnected(true);
        setHasError(false);
      } else {
        setWalletStatus('Disconnected');
        setIsWalletConnected(false);
        setHasError(true);
      }
    }
  };

  return (
    <header className="header">
      <div className="left-section">
        <a href="#home" className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <h2>SparRow</h2>
        </a>
        <nav className="navigation">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#candidates">Candidates</a></li>
            <li><a href="#elections">Elections</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
      </div>
      <div className="right-section">
        <button 
          className={`connect-btn ${isWalletConnected ? 'connected' : ''} ${hasError ? 'error' : ''}`} 
          onClick={handleWalletClick}
        >
          <img src={walletIcon} alt="Wallet Icon" className="wallet-icon" />
          {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
        <button className="profile-btn">
          <img src={profileIcon} alt="Profile Icon" className="profile-icon" />
          {isWalletConnected && (
            <div className="wallet-info">
              <span className="wallet-address">{walletAddress}</span>
              <span className="wallet-status">{walletStatus}</span>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
