import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home-content">
        <h1 className="home-title">Welcome to Decentralized Voting</h1>
        <p className="home-subtitle">Secure and transparent voting on the blockchain.</p>
        <button className="home-button">Connect Wallet</button>
      </div>
    </section>
  );
};

export default Home;
