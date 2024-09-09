import React, { useState } from 'react';
import './Home.css';
import LoginModal from './LoginModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="home" id="home">
      <div className="home-content">
        <h1 className="home-title">Welcome to Decentralized Voting</h1>
        <p className="home-subtitle">Secure and transparent voting on the blockchain.</p>
        <button className="home-button" onClick={openModal}>Login</button>
      </div>

      {isModalOpen && <LoginModal onClose={closeModal} />}
    </section>
  );
};

export default Home;
