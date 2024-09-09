import React, { useState, useEffect } from 'react';
import './Header.css';

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
  // There is no direct way to disconnect MetaMask programmatically
  // You may want to clear application state instead
  return Promise.resolve();
};

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletStatus, setWalletStatus] = useState('Disconnected');

  useEffect(() => {
    // Check if wallet is already connected
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletStatus('Connected');
          setIsWalletConnected(true);
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
    } else {
      const address = await connectWallet();
      if (address) {
        setWalletAddress(address);
        setWalletStatus('Connected');
      }
    }
    setIsWalletConnected(!isWalletConnected);
  };

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
        <button className={`connect-btn ${isWalletConnected ? 'connected' : ''}`} onClick={handleWalletClick}>
          <img src="src/assets/wallet1.png" alt="Wallet Icon" className="wallet-icon" />
          {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
        <button className="profile-btn">
          <img src='src/assets/profile-icon.png' alt='Profile Icon' className="profile-icon" />
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
