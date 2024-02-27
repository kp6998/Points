import React, { useState } from 'react';
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [userName, setUserName] = useState('');

  const handleLogin = () => {
    onLogin(userName.toUpperCase());
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <button type='submit'>Login</button>
      <div className='clsLink'>
        <a>Create your account </a>
        <Link to="/RegistrationForm">Register</Link>
      </div>
    </form>
  );
};

export default LoginForm;
