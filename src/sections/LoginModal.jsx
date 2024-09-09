import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const toggleForm = () => setIsCreatingUser(!isCreatingUser);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    // Handle user creation logic here
  };

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>{isCreatingUser ? 'Create Account' : 'Login'}</h2>
        <form onSubmit={isCreatingUser ? handleCreateUser : handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button className="login-btn" type="submit">
            {isCreatingUser ? 'Create Account' : 'Login'}
          </button>
        </form>
        <p className="toggle-form">
          {isCreatingUser ? (
            <span>Already have an account? <button onClick={toggleForm}>Login</button></span>
          ) : (
            <span>Don't have an account? <button onClick={toggleForm}>Create Account</button></span>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
